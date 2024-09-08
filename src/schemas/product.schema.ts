import Joi from 'joi';

export const productSchema = Joi.object({
    code: Joi.string()
        .min(3)
        .max(30)
        .required()
        .trim()
        .messages({
            'string.min': 'El código debe tener al menos 3 caracteres.',
            'string.max': 'El código no puede tener más de 50 caracteres.',
            'any.required': 'El código es obligatorio.'
        }),
    name: Joi.string()
        .min(3)
        .max(100)
        .required()
        .trim()
        .messages({
            'string.min': 'El nombre debe tener al menos 3 caracteres.',
            'string.max': 'El nombre no puede tener más de 30 caracteres.',
            'any.required': 'El nombre es obligatorio.'
        }),
    description: Joi.string()
        .min(3)
        .max(200)
        .required()
        .trim()
        .messages({
            'string.min': 'La descripción debe tener al menos 3 caracteres.',
            'string.max': 'La descripción no puede tener más de 30 caracteres.',
            'any.required': 'La descripción es obligatorio.'
        }),
    price: Joi.number()
        .min(0.01)
        .required()
        .messages({
            'number.min': 'El precio debe ser > 0.',
            'any.required': 'El precio es obligatorio.'
        }),
    category: Joi.string()
        .min(3)
        .max(50)
        .required()
        .messages({
            'string.min': 'La categoria debe tener al menos 3 caracteres.',
            'string.max': 'La categoria no puede tener más de 30 caracteres.',
            'any.required': 'La categoria es obligatorio.'
        }),
    stock: Joi.number(),
    company: Joi.string()
        .min(3)
        .max(50)
        .required()
        .messages({
            'string.min': 'Nombre de la compañia fabricante debe tener al menos 3 caracteres.',
            'string.max': 'Nombre de la compañia fabricante no puede tener más de 30 caracteres.',
            'any.required': 'Nombre de la compañia fabricante es obligatorio.'
        }),
    companyEmail: Joi.string().email(),
    originCountry: Joi.string().length(2).required(),
});
