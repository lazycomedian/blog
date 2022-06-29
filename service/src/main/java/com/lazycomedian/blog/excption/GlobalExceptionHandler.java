package com.lazycomedian.blog.excption;import com.lazycomedian.blog.enums.StatusCodeEnum;import com.lazycomedian.blog.vo.response.Result;import lombok.extern.slf4j.Slf4j;import org.springframework.web.bind.MethodArgumentNotValidException;import org.springframework.web.bind.annotation.ExceptionHandler;import org.springframework.web.bind.annotation.RestControllerAdvice;import org.springframework.web.servlet.NoHandlerFoundException;import java.util.Objects;/** * 全局异常处理 * * @author lazyComedian * @date 2022/6/26 22:59 **/@RestControllerAdvice@Slf4jpublic class GlobalExceptionHandler {    /**     * 处理服务异常     *     * @param e 异常对象     */    @ExceptionHandler(value = ServiceException.class)    public Result<?> catchException(ServiceException e) {        return Result.failure(e.getStatusCode(), e.getMessage());    }    /**     * 处理参数校验异常     *     * @param e 异常对象     */    @ExceptionHandler(MethodArgumentNotValidException.class)    public Result<?> errorHandler(MethodArgumentNotValidException e) {        String errorMessage = Objects.requireNonNull(e.getBindingResult().getFieldError()).getDefaultMessage();        return Result.failure(StatusCodeEnum.VALID_ERROR.getCode(), errorMessage);    }    /**     * 处理系统异常     *     * @param e 异常对象     */    @ExceptionHandler(value = Exception.class)    public Result<?> errorHandler(Exception e) {        e.printStackTrace();        return Result.failure(StatusCodeEnum.SYSTEM_ERROR.getCode(), StatusCodeEnum.SYSTEM_ERROR.getMsg());    }    /**     * 未找到请求地址对应的接口     *     * @param e 异常对象     */    @ExceptionHandler(value = NoHandlerFoundException.class)    public Result<?> handlerNoFoundException(Exception e) {        log.error(e.getMessage(), e);        return Result.failure(StatusCodeEnum.NOT_FOUND);    }}