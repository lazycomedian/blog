package com.lazycomedian.blog.common.handler.auth;import org.springframework.web.servlet.HandlerInterceptor;import javax.servlet.http.HttpServletRequest;import javax.servlet.http.HttpServletResponse;/** * @author lazyComedian * @date 2022/7/1 09:47 **/public class WebSecurityHandler implements HandlerInterceptor {    @Override    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {//        response.setContentType(APPLICATION_JSON);//        OutputStream out = response.getOutputStream();//        String str = JSON.toJSONString(Result.failure("请求过于频繁，请稍候再试"));//        out.write(str.getBytes(StandardCharsets.UTF_8));//        out.flush();//        out.close();        return true;    }}