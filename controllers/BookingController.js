const mongoose = require('mongoose');
const Appointment = require('../models/appointment.model.js');
const Doctor = require('../models/doctor.model.js');
const Patient = require('../models/patient.model');
const sgMail = require('@sendgrid/mail');

// creates booking
const createBookings = async (req, res) => {
    // validate request
    if(!req.body){
        res.status(400).send({message: "Content can not be empty"});
        return;
    }

    // new appointment
    const userInputMatric_no = req.body.matric_no;
    const patient = await Patient.findOne({matric_no :userInputMatric_no});

    
    // save bookings
    if(userInputMatric_no != req.session.user.matric_no)
    {
        //send invalid matric number error
        req.flash('message', 'Please provide correct Matric no.');
        res.redirect('/bookappointments')
        
    }else 
    {

        const appointment = new Appointment({
        booking_date : req.body.booking_date,
        booking_time : req.body.booking_time,
        patient : patient._id
        })


        //await appointment.save();
        //send success message the user, that appointment has created!
        await appointment
       .save(appointment)
       .then(data => {
           console.log(data);
           res.redirect('/patientdashboard')
       })
       .catch(err => {
           res.status(500).send({
               message: err.message || "Some error occurred while saving the appointment info into database"
           });
       });
    }
 
}

// fetch booking
const findBookings = async (req, res) => {

    // appointments with patient name
    const appointments = await Appointment.find({status: 'pending'}).lean().populate('patient', {name: 1});
    
    if(!appointments){
        //send error
        res.status(400).send({message: "No appointments!"});
        return;
    }else
    {
        console.log('appointment ', appointments)
        // render the page with this data value
        res.render('manageBookings', {title: "E-clinic UTM", layout: "dashboardlayout", appointments: appointments});
    }
}


// APPROVE BOOKING
// ADMIN UPDATES THE APPOINTMNET TO APPROVED
const approveBooking = async (req,res)=>{
    console.log("approved");
    // request appointment id
    const appointment_id = req.params.id;

    // find in database and update status
    const appointment = await Appointment.findByIdAndUpdate(appointment_id,{
        status:'approved'
    }).populate('patient', {email: 1}).then(data => {
        
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
            const msg = {
            to: data.patient.email,
            from: 'smyamin@outlook.com', // Use the email address or domain you verified above
            subject: 'Your Appointment has been Approved',
            text: `Your appointment has been approved by admin of booking on ${data.booking_date} at ${data.booking_time}. Please be at PKU 10 minutes early. Thank you`,
            html: `<strong>Your appointment has been approved by admin of booking on ${data.booking_date} at ${data.booking_time}. Please be at PKU 10 minutes early. Thank you</strong>`,
            };
            //ES8
            (async () => {
            try {
                await sgMail.send(msg);
                res.redirect('/managebookings');
            } catch (error) {
                console.error(error);

                if (error.response) {
                console.error(error.response.body)
                }
            }
            })(); 

    }).catch(err => {
        res.status(500).send({message : err.message})
    })
}

// REJECT BOOKING
// ADMIN UPDATES THE APPOINTMNET TO REJECTED
const rejectBooking = async (req,res)=>{
    console.log("rejected");
    // request appointment id
    const appointment_id = req.params.id;

    // find in database and update status
    const appointment = await Appointment.findByIdAndUpdate(appointment_id,{
        status:'rejected'
    }).populate('patient', {email: 1}).then(async (data) => {
        
            sgMail.setApiKey(process.env.SENDGRID_API_KEY);
            const msg = {
            to: data.patient.email,
            from: 'smyamin@outlook.com', // Use the email address or domain you verified above
            subject: 'Your Appointment has been Rejected',
            text: `Your appointment has been rejected due to unavailability of booking on ${data.booking_date} at ${data.booking_time}. Sorry for inconvinience, please book another appointment. Thank you`,
            html: `<strong>Your appointment has been rejected due to unavailability of booking on ${data.booking_date} at ${data.booking_time}. Sorry for inconvinience, please book another appointment. Thank you</strong>`,
            };
            //ES8
            (async () => {
            try {
                await sgMail.send(msg);
                res.redirect('/managebookings');
            } catch (error) {
                console.error(error);

                if (error.response) {
                console.error(error.response.body)
                }
            }
            })(); 
            

    }).catch(err => {
        res.status(500).send({message : err.message})
    })
}


// FIND ALL APPROVED BOOKINGS
// DOCTORS WILL BE ABLE TO SEE A LIST OF BOOKINGS WITH A STATUS OF 'APPROVED'
const findApprovedAppointments = async (req,res)=>{
    const approvedappointments = await Appointment.find({
        status:'approved'
    }).lean().populate('patient', {name: 1})
    
    if(!approvedappointments){
        //send error
        res.status(400).send({message: "Content can not be empty"});
        return;
    }else{
        console.log("approvedappointments", approvedappointments);
        
        if (req.session.user && req.cookies.user_sid) {
            res.render('doctorDashboard', {title: "E-clinic UTM", layout: "dashboardlayout", approvedappointments: approvedappointments, doctorname: req.session.user.name})
        }else{
            res.redirect('/doctorlogin');
        }
    }
}

// ADMIN VIEW APPROVED APPOINTMENTS
const  adminviewapprovedappointments = async (req,res) => {
    const approvedappointments = await Appointment.find({
        status:'approved'
    }).lean().populate('patient', {name: 1})
    
    if(!approvedappointments){
        //send error
        res.status(400).send({message: "Content can not be empty"});
        return;
    }else{
        console.log("approvedappointments", approvedappointments);
        res.render('approveBookingsView', {title: "E-clinic UTM", approvedappointments: approvedappointments})
    }
}



// CALLED BOOKING
const callBooking = async (req,res)=>{
    //const doctor_id = req.params.doctor_id
    const appointment_id = req.params.id;
    console.log('id', appointment_id);
    const approvedappointment = await Appointment.findById(appointment_id)
    if (approvedappointment.status == 'called'){

        res.status(400).send({message: "This patient has been called already"});
        return;
    } 
    else {

         await Appointment.findByIdAndUpdate(appointment_id,{
            status:'called'
        }).lean().populate('patient').then(appointment => {
            console.log('appointment', appointment)
            res.render('issuePrescription', {title: "E-clinic UTM", appointment: appointment, message: req.flash('message')});
        }).catch(err => {
            res.status(500).send({message: err.message});
        })

    }
}
// DOCTOR WHEN PATIENT CALLED, WILL UPDATE THE BOOKING TO CALLED,
// THIS STATUS PREVENTS FROM OTHER DOCTORS TO SEE THE PATIENT THAT HAS A STATUS 'CALLED'
module.exports = {createBookings, findBookings, approveBooking, rejectBooking, findApprovedAppointments, callBooking, adminviewapprovedappointments};