/* References I used:
   - https://www.youtube.com/watch?v=TNt3GHuayXs
*/
package levelBuilder.com;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder(12);

    @Qualifier("myUserDetailsService")
    @Autowired
    UserDetailsService userDetailsService;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests()
                .antMatchers("/home", "/my-profile", "/my-projects", "/share").hasRole("USER")
                .antMatchers("/fileController/**").permitAll()
                .antMatchers("/", "/registration").permitAll()
                .antMatchers("/forgot-password", "/confirm-reset", "/forgot-username").permitAll()
                .and().formLogin().loginPage("/login").successForwardUrl("/my-profile");
        http.csrf().disable();
    }

    @Bean
    public PasswordEncoder getPasswordEncoder() {
        return bCryptPasswordEncoder;
    }
}
