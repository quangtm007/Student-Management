package com.ait.manager.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import com.ait.manager.service.user.UserService;

@Configuration
//@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

  @Autowired
  private UserService userService;

  @Autowired
  private JwtRequestFilter jwtRequestFilter;



  @Bean
  public PasswordEncoder passwordEncoder() {
      return new BCryptPasswordEncoder(10);
  }

  @Autowired
  public void configureGlobalSecurity(AuthenticationManagerBuilder auth) throws Exception {
      auth.userDetailsService(userService).passwordEncoder(passwordEncoder());
  }

  @Override
  public void configure(HttpSecurity http) throws Exception {

      http.authorizeRequests()

              .antMatchers(HttpMethod.OPTIONS, "/login", "/assets/**", "/templates/**","/","/student").permitAll()
              .anyRequest().authenticated()
              .and()
              .formLogin()
              .loginProcessingUrl("/login")
              .loginPage("/login")
              .usernameParameter("username")
              .passwordParameter("password")
              .and().exceptionHandling().accessDeniedPage("/error-403")
              .and().csrf().disable();

      http.logout().logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
              .logoutSuccessUrl("/login")
              .logoutUrl("/logout")
              .deleteCookies("JWT").invalidateHttpSession(true)
              .deleteCookies("JSESSIONID").invalidateHttpSession(true)
              .permitAll();

      http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class)
              .csrf().disable();

  }
  
  @Override
  public void configure(WebSecurity web) throws Exception {
    web.ignoring().antMatchers("/assets/**","/api/login","/post/**");
  }
}
