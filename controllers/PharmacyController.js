const Pharmacist = require('../models/pharmacy.model');

const pharmacylogin = async (req, res) => {

    const {username, password} = req.body;
    
     try {
        const pharmacy = await Pharmacist.findOne({ username: username, password: password }).lean();
        if(!pharmacy) {
            req.flash('message', 'Empty fields or wrong credentials!');
            res.redirect('/pharmacylogin');
        }
        
        req.session.user = pharmacy;
        res.redirect("/pharmacydashboard");
    } catch (error) {
      console.log(error)
    }
};

module.exports = {pharmacylogin};