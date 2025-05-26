package br.com.fiap.monitoramentomottu.exception;

import br.com.fiap.monitoramentomottu.dto.Anotacao.ExistsId;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.springframework.stereotype.Component;

@Component
public class ExistsIdValidator implements ConstraintValidator<ExistsId, Long> {

    @PersistenceContext
    private EntityManager entityManager;

    private Class<?> entityClass;

    @Override
    public void initialize(ExistsId constraintAnnotation) {
        this.entityClass = constraintAnnotation.entity();
    }

    @Override
    public boolean isValid(Long value, ConstraintValidatorContext context) {
        if (value == null) return true; // Deixe o @NotNull cuidar disso
        return entityManager.find(entityClass, value) != null;
    }
}
