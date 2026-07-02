const Joi = require("joi");

const voteValidation = (data) => {
    const schema = Joi.object({
        candidateId: Joi.string().required(),
        electionId: Joi.string().required(),
    });

    return schema.validate(data);
};

module.exports = voteValidation;