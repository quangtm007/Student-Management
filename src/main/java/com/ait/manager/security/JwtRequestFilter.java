package com.ait.manager.security;


import com.nimbusds.jwt.JWTClaimsSet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.util.WebUtils;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

@Component
public class JwtRequestFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    private String getCookieValue(HttpServletRequest req, String cookieName) {
        return Arrays.stream(req.getCookies())
                .filter(c -> c.getName().equals(cookieName))
                .findFirst()
                .map(Cookie::getValue)
                .orElse(null);
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        response.addHeader("Access-Control-Allow-Origin", "http://localhost:5000");
        response.addHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT, PATCH, HEAD");
        response.addHeader("Access-Control-Allow-Headers", "Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
        response.addHeader("Access-Control-Expose-Headers", "Access-Control-Allow-Origin, Access-Control-Allow-Credentials");
        response.addHeader("Access-Control-Allow-Credentials", "true");
        response.addIntHeader("Access-Control-Max-Age", 10);

        final String authorizationHeader = request.getHeader("Authorization");

//        Cookie authorizationCookie = WebUtils.getCookie(request, "JWT");
//        final String authorizationCookie = getCookieValue(request, "JWT");


        UserPrincipal user = null;
//        Token token = new Token();
        String token = null;
        if (StringUtils.hasText(authorizationHeader) && authorizationHeader.startsWith("Bearer ")) {
            String jwt = authorizationHeader.substring(7);
            user = jwtUtil.getUserFromToken(jwt);
//            token = verificationTokenService.findByToken(jwt);
            token = jwt;
            System.out.println("jwt");
            System.out.println(jwt);
//            assert false;
//            token.setToken(jwt);
        }
        else {
//            String authorizationCookie = Arrays.stream(request.getCookies()).filter(c -> c.getName().equals("JWT"))
//                    .findFirst()
//                    .map(Cookie::getValue)
//                    .orElse(null);
            Cookie cookie = WebUtils.getCookie(request, "JWT");
            if (cookie != null) {
                String authorizationCookie = cookie.getValue();

                if (authorizationCookie != null) {
//                token = authorizationCookie.getValue();
//                user = jwtUtil.getUserFromToken(token);
                    System.out.println("authorizationCookie");
                    System.out.println(authorizationCookie);
                    assert false;
                    token = authorizationCookie;
//                token.setToken(authorizationCookie);
                    user = jwtUtil.getUserFromToken(authorizationCookie);
                }
            }

        }

        if (null != user && token != null) {
            JWTClaimsSet claims = jwtUtil.getClaimsFromToken(token);
            if (jwtUtil.isTokenExpired(claims)) {
                Set<GrantedAuthority> authorities = new HashSet<>();
                user.getAuthorities().forEach(p -> authorities.add(new SimpleGrantedAuthority((String) p)));
                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(user, null, authorities);
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        }

        filterChain.doFilter(request, response);
    }

}