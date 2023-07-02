const getValidationErrorText = (errors) => `
${Object.values(errors)
    .map((error) => error.message)
    .join(', ')}
    `;

module.exports = { getValidationErrorText };
