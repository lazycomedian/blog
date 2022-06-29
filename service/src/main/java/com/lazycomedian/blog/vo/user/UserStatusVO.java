package com.lazycomedian.blog.vo.user;import com.lazycomedian.blog.annotation.validation.StatusValid;import lombok.Data;import javax.validation.constraints.NotNull;/** * 用户状态VO * * @author lazyComedian * @date 2022/6/26 23:42 **/@Datapublic class UserStatusVO {    /**     * 用户ID     */    @NotNull(message = "用户id不能为空")    private Integer id;    /**     * 用户状态     */    @NotNull(message = "用状态不能为空")    @StatusValid(message = "传入装爱")    private Integer status;}