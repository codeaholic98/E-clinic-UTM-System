const Doctor = require('../models/doctor.model');
const Pharmacist = require('../models/pharmacy.model');
const Admin = require('../models/admin.model');

/* 
    module for admin login 
*/ 

const adminlogin = async (req, res) => {

    const {username, password} = req.body;
    
     try {
        const admin = await Admin.findOne({ username: username, password: password }).lean();
        if(!admin) {
            res.redirect("/doctorlogin");
        }
        
        req.session.user = admin;
        res.redirect("/admindashboard");
    } catch (error) {
      console.log(error)
    }
};


/* 
    modules for manage doctor 
*/ 

// create doctor
const createDoctor = (req, res) => {
    // validate request
    if(!req.body){
        res.status(400).send({message: "Content can not be empty"});
        return;
    }

    // New Dctor
    const doctor = new Doctor({
        username: req.body.username, 
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        sitting_time: req.body.sitting_time,
        age: req.body.age,
        gender: req.body.gender,
        phone_no: req.body.phone_no
    })

    
    // save doctor in the database
    doctor
        .save(doctor)
        .then(data => {
            res.redirect('/managedoctor')
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while saving the doctor info into database"
            });
        });

}

// find doctor 
const findDoctor = (req, res) => {
    Doctor.find({}).lean()
    .then(doctors => {
       
        res.render('manageDoctor', {title: "E-clinic UTM", layout: "dashboardlayout", doctors: doctors});
    })
    .catch(err => {
        res.status(500).send({message: err.message || "Error Occurred while retriving doctor info from DB"})
    })
}

// update doctor 
const updateDoctor = (req, res) => {
    if(!req.body){
        return res.status(400).send({message: "Data/field to be updated can not be empty"})
    }
    console.log(req.body);
    const {id} = req.params;
    console.log("id: ", id)
    Doctor.findByIdAndUpdate(id, req.body, {useFindAndModify:false})
    .then(doctor => {
        if(!doctor){
            res.status(404).send({message: `Can not Update the doctor with ${id}. Maybe user not found!`})
        }else{
            res.send(doctor)
        }
    })
    .catch(err => {
        res.status(500).send({message: err.message || "Error! can not update info"})
    })

}

// delete doctor 
const deleteDoctor = (req, res) => {
    const id = req.params.id;
    console.log("id: ", id)
    Doctor.findByIdAndDelete(id)
    .then(data => {
        if(!data){
            res.status(404).send({message: `Can not delete with id ${id}. Maybe id is wrong`})
        }else{
            res.redirect('/managedoctor')
        }
    })
    .catch(err => {
        res.status(500).send({message: err.message || `Could not delete User with id ${id}`})
    })
}


/*
    modules for manage pharmacist 
*/

// create pharmacist 
const createPharmacist = (req, res) => {
    // validate request
    if(!req.body){
        res.status(400).send({message: "Content can not be empty"});
        return;
    }

    // New Pharmacist
    const pharmacist = new Pharmacist({
        username: req.body.username, 
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        age: req.body.age,
        gender: req.body.gender
    })


    // save pharmacist in the database 
    pharmacist
        .save(pharmacist)
        .then(data => {
            res.redirect('/managepharmacy')
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while saving the pharmacist info into database"
            });
        });
    
}

// find pharmacist 
const findPharmacist = (req, res) => {
    Pharmacist.find({}).lean()
    .then(pharmacists => {
        res.render('managePharmacy', {title: "E-clinic UTM", layout: "dashboardlayout", pharmacists: pharmacists});
    })
    .catch(err => {
        res.status(500).send({message: err.message || "Error Occurred while retriving pharmacist info from DB"})
    })
}

// update pharmacist 
const updatePharmacist = (req, res) => {
    if(!req.body){
        return res.status(400).send({message: "Data/field to be updated can not be empty"})
    }

    const {id} = req.params;
    Pharmacist.findByIdAndUpdate(id, req.body, {useFindAndModify:false})
    .then(pharmacist => {
        if(!pharmacist){
            res.status(404).send({message: `Can not Update the pharmacist with ${id}. Maybe user not found!`})
        }else{
            res.send(pharmacist)
        }
    })
    .catch(err => {
        res.status(500).send({message: err.message || "Error! can not update info"})
    })
}

// delete pharmacist 
const deletePharmacist = (req, res) => {
    const id = req.params.id;
    console.log("id: ", id)
    Pharmacist.findByIdAndDelete(id)
    .then(data => {
        if(!data){
            res.status(404).send({message: `Can not delete with id ${id}. Maybe id is wrong`})
        }else{
            res.redirect('/managepharmacy')
        }
    })
    .catch(err => {
        res.status(500).send({message: err.message || `Could not delete User with id ${id}`})
    })
}


module.exports = {adminlogin, createDoctor, createPharmacist, findDoctor, findPharmacist, updateDoctor, updatePharmacist, deleteDoctor, deletePharmacist};


