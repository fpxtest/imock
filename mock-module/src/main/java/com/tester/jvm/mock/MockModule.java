package com.tester.jvm.mock;

import com.alibaba.fastjson.JSON;
import com.alibaba.jvm.sandbox.api.*;
import com.alibaba.jvm.sandbox.api.Information.Mode;
import com.alibaba.jvm.sandbox.api.annotation.Command;
import com.alibaba.jvm.sandbox.api.listener.ext.Advice;
import com.alibaba.jvm.sandbox.api.listener.ext.AdviceListener;
import com.alibaba.jvm.sandbox.api.listener.ext.EventWatchBuilder;
import com.alibaba.jvm.sandbox.api.resource.*;


import com.tester.jvm.mock.impl.ClassloaderBridge;
import com.tester.jvm.mock.impl.DefaultConfigManager;
import com.tester.jvm.mock.model.MockConfig;
import com.tester.jvm.mock.model.MockResult;
import com.tester.jvm.mock.model.ReturnObject;
import com.tester.jvm.mock.util.*;
import org.apache.commons.lang3.StringUtils;
import org.kohsuke.MetaInfServices;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.annotation.Resource;
import java.io.IOException;
import java.io.PrintWriter;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Type;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicBoolean;

import static com.tester.jvm.mock.util.FileUtil.readLastRows;


/**
 * <p>
 *
 * @author fusheng.chu
 */
@MetaInfServices(Module.class)
@Information(id = com.tester.jvm.mock.Constants.MODULE_ID, author = "fusheng.chu", version = com.tester.jvm.mock.Constants.VERSION)
public class MockModule implements Module, ModuleLifecycle {

    private final static Logger log = LoggerFactory.getLogger(MockModule.class);

    @Resource
    private ModuleEventWatcher eventWatcher;

    @Resource
    private ModuleController moduleController;

    @Resource
    private ConfigInfo configInfo;

    @Resource
    private ModuleManager moduleManager;

    @Resource
    private LoadedClassDataSource loadedClassDataSource;


    private com.tester.jvm.mock.HeartbeatHandler heartbeatHandler;

//    private AtomicBoolean initialized = new AtomicBoolean(false);

    @Override
    public void onLoad() throws Throwable {
        // 初始化日志框架
        LogbackUtils.init(PathUtils.getConfigPath() + "/mock-logback.xml");
        Mode mode = configInfo.getMode();
        log.info("module on loaded,id={},version={},mode={}", com.tester.jvm.mock.Constants.MODULE_ID, com.tester.jvm.mock.Constants.VERSION, mode);

    }

    @Override
    public void onUnload() throws Throwable {
        log.info("onUnload");
    }

    @Override
    public void onActive() throws Throwable {
        log.info("onActive");
    }

    @Override
    public void onFrozen() throws Throwable {
        log.info("onFrozen");
    }

    @Override
    public void loadCompleted() {

        log.info("loadCompleted");

        ExecutorInner.execute(new Runnable() {
            @Override
            public void run() {

                DefaultConfigManager configManager = new DefaultConfigManager();
                MockResult<List<MockConfig>> pr = configManager.pullConfig();
                if (pr.isSuccess()) {
                    LogUtil.info2("pullConfig success config", JSON.toJSONString(pr.getData()));
                    ClassloaderBridge.init(loadedClassDataSource);
                    initialize(pr.getData());
                } else {
                    log.warn("pullConfig     success    but is null, config    ={}", pr.getData());
                }
            }
        });
        heartbeatHandler = new com.tester.jvm.mock.HeartbeatHandler(configInfo, moduleManager);
        heartbeatHandler.start();
    }


    /**
     * 初始化mock
     *
     * @param config 配置文件
     */
    private synchronized void initialize(List<MockConfig> config) {
//        if (initialized.compareAndSet(false, true)) {
        if (true) {
            try {
                for (final MockConfig mc : config) {
                    if (mc.getIsThrows()) {
                        new EventWatchBuilder(eventWatcher)
                                .onClass(mc.getMockClass())
                                .onBehavior(mc.getMockMethod())
                                .onWatch(new AdviceListener() {
                                    /**
                                     * 拦截方法，当这个方法调用后通知
                                     */
                                    @Override
                                    protected void afterReturning(Advice advice) throws Throwable {
                                        if (advice.getReturnObj() != null) {
                                            LogUtil.info2("advice", "returnObj: " + advice.getReturnObj().getClass() + " ParameterArray" + advice.getParameterArray());
                                            LogUtil.info2("mcReturnObj", mc.getReturnObj());
                                        }

                                        if (StringUtils.isNoneBlank(mc.getRuleConfig())) {
                                            if (JSON.toJSONString(advice.getParameterArray()).contains(mc.getRuleConfig())) {
                                                returnExceptionObj(mc, advice);
                                            }
                                        } else {
                                            //      在此，返回相应的异常
                                            returnExceptionObj(mc, advice);
                                        }
                                    }
                                });
                    } else {
                        new EventWatchBuilder(eventWatcher)
                                .onClass(mc.getMockClass())
                                .onBehavior(mc.getMockMethod())
                                .onWatch(new AdviceListener() {
                                    /**
                                     * 拦截方法，当这个方法调用后通知
                                     */
                                    @Override
                                    protected void afterReturning(Advice advice) throws Throwable {

                                        LogUtil.info2("advice", "returnObj= " + advice.getReturnObj().getClass() + "ParameterArray" + advice.getParameterArray());
                                        LogUtil.info2("mcReturnObj", mc.getReturnObj());

                                        if (StringUtils.isNoneBlank(mc.getRuleConfig())) {
                                            if (JSON.toJSONString(advice.getParameterArray()).contains(mc.getRuleConfig())) {
                                                returnObj(mc, advice);
                                            }
                                        } else {
                                            returnObj(mc, advice);
                                        }
                                    }
                                });
                    }
                }
                log.info("initialize success");

            } catch (Throwable throwable) {
//                initialized.compareAndSet(true, false);
                log.error("error occurred when initialize module" + throwable);
            }
        }
    }

    public void returnExceptionObj(MockConfig mc, Advice advice) throws Throwable {
        ReturnObject ro = JSON.parseObject(mc.getReturnObj(), ReturnObject.class);
        Class<Throwable> throwableClass = (Class<Throwable>) advice.getTarget().getClass().getClassLoader().loadClass(ro.getReturnData()).newInstance();
//        Class<Throwable> throwableClass = (Class<Throwable>) Class.forName(ro.getReturnData());
        ProcessController.throwsImmediately(throwableClass.newInstance());
    }

    public void returnObj(MockConfig mc, Advice advice) throws ProcessControlException, NoSuchMethodException, IllegalAccessException, InvocationTargetException, InstantiationException {

        ReturnObject ro = JSON.parseObject(mc.getReturnObj(), ReturnObject.class);
        int classLength = ro.getClassNames().length;
        switch (classLength) {
            case 0:
                ProcessController.returnImmediately(advice.getReturnObj().getClass().getConstructor(ro.getReturnData().getClass()).newInstance(ro.getReturnData()));
                ProcessController.returnImmediately(this.newObj(advice.getReturnObj().getClass().getName(), ro.getReturnData()));
                break;
            case 1:
                Object res = JSON.parseObject(ro.getReturnData(), advice.getReturnObj().getClass());
                ProcessController.returnImmediately(res);
                break;
            default:
                Object res2 = BeansUtils.getInstance().parseByTypes(ro.getReturnData(), getTypes(ro.getClassNames(), advice));
                ProcessController.returnImmediately(res2);
        }
    }

    public Type[] getTypes(String[] classNames, Advice advice) {
        Type[] types = new Type[classNames.length];
        try {
            for (int i = 0; i < classNames.length; i++) {
                types[i] = advice.getTarget().getClass().getClassLoader().loadClass(classNames[i]);
            }
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
        return types;
    }


    public Object newObj(String className, Object... args) {
        Class[] classes = new Class[args.length];
        for (int i = 0; i < classes.length; i++) {
            classes[i] = args[i].getClass();
        }
        Object obj = null;
        try {
            obj = Class.forName(className).getConstructor(classes).newInstance(args);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return obj;
    }


    /**
     * 重新加载
     *
     * @param req    请求参数
     * @param writer printWriter
     */
    @Command("reload")
    public void reload(final Map<String, String> req, final PrintWriter writer) {
        try {
//            if (initialized.compareAndSet(true, false)) {
            reload();
//                initialized.compareAndSet(false, true);
//            }
        } catch (Throwable throwable) {
            writer.write(throwable.getMessage());
//            initialized.compareAndSet(false, true);
        }
    }

    @Command("log")
    public void logText(final Map<String, String> req, final PrintWriter writer) {
        try {
            writer.println(readLastRows(System.getProperty("user.home") + "/logs/sandbox/mock/mock.log", null, 50));
        } catch (IOException e) {
            LogUtil.info2("getLog  Exception", e.getMessage());
            writer.println("查询log异常");
        }
    }


    @Command("heart")
    public void heart() {
        try {
            heartbeatHandler = new com.tester.jvm.mock.HeartbeatHandler(configInfo, moduleManager);
            heartbeatHandler.start();
        } catch (Throwable throwable) {
            log.error("heart error", throwable);
        }
    }

    private synchronized void reload() throws ModuleException {
        moduleController.frozen();
        // unwatch all plugin
        DefaultConfigManager configManager = new DefaultConfigManager();
        MockResult<List<MockConfig>> result = configManager.pullConfig();
        if (!result.isSuccess()) {
            log.error("reload failed, cause pull config not success");
            return;
        }

        // reWatch
        initialize(result.getData());
        moduleController.active();
    }

}
