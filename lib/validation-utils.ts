export interface ValidationResult {
  isValid: boolean
  errors: string[]
}

export function validateEmail(email: string): ValidationResult {
  const errors: string[] = []

  if (!email) {
    errors.push("Email is required")
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push("Please enter a valid email address")
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

export function validateName(name: string, minLength = 2): ValidationResult {
  const errors: string[] = []

  if (!name) {
    errors.push("Name is required")
  } else if (name.length < minLength) {
    errors.push(`Name must be at least ${minLength} characters long`)
  } else if (!/^[a-zA-Z\s\u0600-\u06FF]+$/.test(name)) {
    errors.push("Name can only contain letters and spaces")
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

export function validateMessage(message: string, minLength = 10, maxLength = 1000): ValidationResult {
  const errors: string[] = []

  if (!message) {
    errors.push("Message is required")
  } else if (message.length < minLength) {
    errors.push(`Message must be at least ${minLength} characters long`)
  } else if (message.length > maxLength) {
    errors.push(`Message must be no more than ${maxLength} characters long`)
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

export function validateForm(
  fields: Record<string, any>,
  rules: Record<string, (value: any) => ValidationResult>,
): ValidationResult {
  const allErrors: string[] = []

  Object.entries(fields).forEach(([fieldName, value]) => {
    const validator = rules[fieldName]
    if (validator) {
      const result = validator(value)
      if (!result.isValid) {
        allErrors.push(...result.errors)
      }
    }
  })

  return {
    isValid: allErrors.length === 0,
    errors: allErrors,
  }
}
