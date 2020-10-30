const contactService = require("../services/contact.service");
const githubService = require("../services/github.service");
const { NotFound, Unauthorized, BadRequest } = require("../utils/errors.util");
const { Response, ResponseCreated } = require("../utils/response.util");

async function get(req, res, next) {
  try {
    const contacts = await contactService.findAll(req.app.locals.user.id);

    return new Response(res, contacts);
  } catch (error) {
    next(error);
  }
}

async function getGithubAccountInfo(req, res, next) {
  try {
    const contact = await contactService.find(req.params.id);

    if (!contact) throw new NotFound("Contact not found.");

    if (!contact.githubUsername)
      throw new BadRequest(
        "There's no GitHub username linked to this contact."
      );

    const data = await githubService.getUserInfo(contact.githubUsername);

    if (!data)
      throw new NotFound(
        "Seems like there's no GitHub account with provided username."
      );

    return new Response(res, data);
  } catch (error) {
    next(error);
  }
}

async function add(req, res, next) {
  const { name, email, phone } = req.body;
  try {
    const contact = await contactService.create({
      userId: req.app.locals.user.id,
      name,
      email,
      phone,
    });
    return new ResponseCreated(res, contact, "Contact created successfully.");
  } catch (error) {
    next(error);
  }
}

async function update(req, res, next) {
  const { name, email, phone } = req.body;

  const contactFields = {};
  if (name) contactFields.name = name;
  if (email) contactFields.email = email;
  if (phone) contactFields.phone = phone;

  try {
    let contact = await contactService.find(req.params.id);

    if (!contact) throw new NotFound("Contact not found.");

    if (contact.userId !== req.app.locals.user.id)
      throw new Unauthorized("Not authorized.");

    contact = await contactService.update(contactFields, req.params.id);

    return new ResponseCreated(res, contact, "Contact updated successfully.");
  } catch (error) {
    next(error);
  }
}

async function remove(req, res, next) {
  try {
    let contact = await contactService.find(req.params.id);

    if (!contact) throw new NotFound("Contact not found.");

    if (contact.userId !== req.app.locals.user.id)
      throw new Unauthorized("Not authorized.");

    await contactService.destroy(req.params.id);

    return new Response(res, { id: req.params.id }, "Contact removed.");
  } catch (error) {
    next(error);
  }
}

module.exports = {
  get,
  add,
  update,
  remove,
  getGithubAccountInfo,
};
