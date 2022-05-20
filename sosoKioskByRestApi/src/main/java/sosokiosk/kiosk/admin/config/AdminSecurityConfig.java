package sosokiosk.kiosk.admin.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import sosokiosk.kiosk.admin.handler.AdminLoginFailHandler;
import sosokiosk.kiosk.admin.handler.AdminLoginSuccessHandler;

@Order(2)
@Configuration
@EnableWebSecurity
public class AdminSecurityConfig extends WebSecurityConfigurerAdapter {
    @Override
    protected void configure(HttpSecurity http) throws Exception {

//        http.csrf().disable();

        http
                .csrf().ignoringAntMatchers("/admin/**");

        http
                .antMatcher("/admin/**")
                .authorizeRequests()
                .antMatchers("/**").permitAll()
                .anyRequest().authenticated();

//        http
//                .csrf().disable()
//                .antMatcher("/admin/**")
//                .authorizeRequests()
//                .antMatchers("/admin/**").access("hasRole('ROLE_ADMIN')")
////                .antMatchers("/admin/**").permitAll()
//                .anyRequest().authenticated()
//                .and()
//                .formLogin()
//                .loginPage("/admin/login")
//                .loginProcessingUrl("/admin/login")
//                .successHandler(new AdminLoginSuccessHandler()).failureHandler(new AdminLoginFailHandler())
//                .permitAll()
//                .and()
//                .logout()
//                .logoutUrl("/admin/logout")
//                .logoutSuccessUrl("/")
//                .invalidateHttpSession(true);
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
        authenticationProvider.setPasswordEncoder(passwordEncoder());
        authenticationProvider.setUserDetailsService(userDetailsService());
        return authenticationProvider;
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(authenticationProvider());
    }
}
