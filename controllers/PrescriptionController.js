const Prescription = require('../models/prescription.model');
const Patient = require('../models/patient.model');

/*
    module for creating prescriptions
*/
const createPrescription = async (req,res) => {
    // validate request
    if(!req.body){
        res.status(400).send({message: "Content can not be empty"});
        return;
    }

    // create prescription
    const matric = req.body.matric_no;
    const patient = await Patient.findOne({matric_no : matric});

        const prescription = new Prescription({
            issue_date: req.body.issue_date,
            prescription_type: req.body.prescription_type,
            prescription_details: req.body.prescription_details,
            patient: patient._id
        })

        if(!prescription){
            req.flash('message', 'Please provide something in the field! Fields can not be empty');
            res.redirect('/issueprescription');
        }else{
            await prescription
        .save(prescription)
        .then(data => {
            console.log(data);
            res.redirect('/doctordashboard');
        }).catch(err => {
            res.status(500).send({message: err.message});
        })
        }
}


/*
    module for display all patient prescriptions in pharmacy
*/

const findPrescriptions = async (req,res) => {

    // appointments with patient name
    const prescriptions = await Prescription.find({
        status: 'pending'
    }).lean().populate('patient', {name: 1});

    if(!prescriptions){
        //send error
        res.status(400).send({message: "No prescriptions!"});
        return;
    }else
    {
        console.log('prescriptions ', prescriptions)

        // render the page with this data value
        if (req.session.user && req.cookies.user_sid) {
            res.render('pharmacyDashboard', {title: "E-clinic UTM", layout: "dashboardlayout", prescriptions: prescriptions});
        }else{
            res.redirect('/pharmacylogin');
        }
    }
}

/*
    view prescription by id -> for pharmacy view
*/
const viewprescription = async (req,res) => {
    const prescription_id = req.params.id;
    console.log(prescription_id);

    const prescription = await Prescription.findById(prescription_id);
    if (prescription.status == 'viewed'){

        res.status(400).send({message: "This prescription has been viewed already"});
        return;
    } 
    else {
        await Prescription.findByIdAndUpdate(prescription_id,{
            status: 'viewed'
        }).lean().populate('patient').then(prescription => {
            console.log('prescription', prescription)
            res.render('prescriptionPage', {title: "E-clinic UTM", prescription: prescription});
        }).catch(err => {
            res.status(500).send({message: err.message});
        })
    }

}

/*
    view prescription by matric -> for doctor view
*/

const findPrescriptionsWithMatric = async (req,res) => {
    // validate request
    if(!req.body){
        res.status(400).send({message: "Content can not be empty"});
        return;
    }
    // search patient with particular matric
    const matric = req.body.matric_no;
    const patient = await Patient.findOne({matric_no : matric});
    //fetch prescription using patient id
    if(patient)
    {
        const prescription = await Prescription.find({patient : patient._id, status: 'viewed'})
        .sort({"issue_date": -1})
        .limit(1)
        .lean().populate('patient'); //gets the latest one
        if(!prescription)
        {
            //no prescription against this matric card message!
            req.flash('message', 'No prescription against this matric no.!');
            res.redirect('/viewpatientreport');
        }else
        {
            //render the page with the found prescription
            console.log('THE NEW ONE ', prescription)
            res.render('doctorPrescriptionPage', {title: "E-clinic UTM", prescription: prescription[0]});
        }

    }else
    {
        //invalid Matric card number!
        req.flash('message', 'Invalid matric no.');
        res.redirect('/viewpatientreport');
    }

}

/* for patient to show all his/her prescription */

const findpatientprescriptions = async (req, res) => {
    const patient_id = req.session.user._id;
    console.log(patient_id);
    if(patient_id){
        const prescription = await Prescription.find({patient: patient_id, status: 'viewed'}).lean().then(prescription => {
            console.log('prescription', prescription)
            res.render('viewDiagnosticReport', {title: "E-clinic UTM", layout: "dashboardlayout", prescription: prescription});
        }).catch(err => {
            res.status(500).send({message: err.message});
        })
    }
    
}

/* for patient to view prescription*/

const viewpatientprescription = async (req,res) => {
    const prescription_id = req.params.id;
    console.log(prescription_id);

    const prescription = await Prescription.findById(prescription_id).lean().populate('patient')
    .then(prescription => {
        console.log('prescription', prescription)
        res.render('patientPrescriptionPage', {title: "E-clinic UTM", prescription: prescription});
    }).catch(err => {
        res.status(500).send({message: err.message});
    })

}

module.exports = {createPrescription, findPrescriptions, viewprescription, findPrescriptionsWithMatric, findpatientprescriptions, viewpatientprescription};