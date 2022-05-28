package sosokiosk.kiosk.admin.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Order(2)
@Configuration
@EnableWebSecurity
public class AdminSecurityConfig extends WebSecurityConfigurerAdapter {
    @Override
    protected void configure(HttpSecurity http) throws Exception {

//        http.csrf().disable();

        http.csrf().ignoringAntMatchers("/admin/**");

        http.antMatcher("/admin/**").authorizeRequests().antMatchers("/**").permitAll().anyRequest().authenticated();

    }

}
