package com.first.funfun.config;

import org.springframework.web.servlet.HandlerInterceptor;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

public class LoginCheckInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
            throws Exception {
        // CORS 요청은 인증 확인을 패스하도록 함
        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            return true;
        }

        HttpSession session = request.getSession(false);

        // 세션이 존재하지 않거나, 로그인 정보가 없으면 차단
        if (session == null || session.getAttribute("loginUser") == null) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.setContentType("application/json; charset=UTF-8");
            response.getWriter().write("{\"error\": \"Unauthorized\", \"message\": \"로그인이 필요하거나 권한이 없습니다.\"}");
            return false; // 컨트롤러로 요청을 넘기지 않음
        }

        return true; // 세션이 존재하면 요청 승인
    }
}