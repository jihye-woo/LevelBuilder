package levelBuilder.com;

import levelBuilder.com.entities.UserEntity;
import levelBuilder.com.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.ValidationUtils;
import org.springframework.validation.Validator;

@Component
public class UserValidator implements Validator {
    @Autowired
    private UserRepository userRepository;

    @Override
    public boolean supports(Class<?> aClass) {
        return UserEntity.class.equals(aClass);
    }

    @Override
    public void validate(Object o, Errors errors) {
        UserEntity user = (UserEntity) o;

        ValidationUtils.rejectIfEmptyOrWhitespace(errors, "username", "NotEmpty", "Not valid");
        if (userRepository.findByUsername(user.getUsername()) != null) {
            errors.rejectValue("username", "Username Already Exists");
        }
        ValidationUtils.rejectIfEmptyOrWhitespace(errors, "password", "NotEmpty", "Not valid");
        ValidationUtils.rejectIfEmptyOrWhitespace(errors, "email", "NotEmpty", "Not valid");
        if (userRepository.findByEmail(user.getEmail()) != null) {
            errors.rejectValue("email", "Email Already Associated With an Account");
        }
        ValidationUtils.rejectIfEmptyOrWhitespace(errors, "name", "NotEmpty", "Not valid");
        ValidationUtils.rejectIfEmptyOrWhitespace(errors, "birthdate", "NotEmpty", "Not valid");
        ValidationUtils.rejectIfEmptyOrWhitespace(errors, "phonenumber", "NotEmpty", "Not valid");
    }
}
