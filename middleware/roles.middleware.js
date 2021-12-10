function admin(req, res, next) 
{
	if (!req.user.roles.includes("admin"))
	{
		return res.status(403).json({ error: "Access denied (Do you have admin role?)."});
	}

	next();
}

function regular(req, res, next) 
{
	if (!req.user.roles.includes("regular"))
	{
		return res.status(403).json({ error: "Access denied (Do you have regular user role?"});
	}

	next();
}

module.exports = { admin, regular };