var express = require('express');
var app = express();
const port=5000
const uniqid = require('uniqid');
console.log(uniqid());
const dateObject = new Date();
const dateData = (`0${dateObject.getDate()}`).slice(-2);
const hours = dateObject.getHours();
const minutes = dateObject.getMinutes();
const seconds = dateObject.getSeconds();
const timeData=`${hours}:${minutes}:${seconds}`;
console.log(timeData);
let rooms = [];
let roomNo = 20;
let bookings =[];
console.log(bookings);
/*const rooms=[{
    "noSeats" : 30,
    "amenities" : ["AC","NON-AC"],
    "price" : 80
}
  ];
  const bookings=[{
    "customerName" : "Harish",
    "date" : "01/09/2023",
    "startTime" : "14:00:00",
    "endTime" : "22:00:00",
    "roomID" : 1
  },{
    "customerName" : "Mangai",
    "date" : "03/09/2023",
    "startTime" : "17:00:00",
    "endTime" : "20:00:00",
    "roomID" : 2
  },{
    "customerName" : "Ganga",
    "date" : "10/09/2023",
    "startTime" : "02:00:00",
    "endTime" : "10:00:00",
    "roomID" : 3
  },{
    "customerName" : "Arul",
    "date" : "10/09/2023",
    "startTime" : "04:00:00",
    "endTime" : "11:00:00",
    "roomID" : 4
  },{
    "customerName" : "Viruman",
    "date" : "15/09/2023",
    "startTime" : "10:00:00",
    "endTime" : "20:00:00",
    "roomID" : 5
  }]
  */
    app.get('/',function(req,res){
        res.send("Home Page!!!!!!!!!!");
    });

    app.get('/allrooms',function(req,res){
        res.send(rooms);
        });

    app.get('/allcustomers',function(req,res){
        res.json({
            output: bookings
        });
        });
    
    app.post('/createroom',function(req,res){
        let room={};
        room.id=uniqid();
        room.roomNo=roomNo;
       // room.noSeats=noSeats;
        //room.amenities=amenities;
        room.bookings = [];
        if(req.body.noSeats){room.noSeats = req.body.noSeats} else{res.status(400).json({ output: 'Please specify No of seats for Room'})};
        if(req.body.amenities){room.amenities = req.body.amenities} else{res.status(400).json({ output: 'Please specify all Amenities for Room in Array format'})};
        if(req.body.price){room.price = req.body.price} else{res.status(400).json({ output: 'Please specify price per hour for Room'})};
        rooms.push(room);
        roomNo++;
        res.status(200).json({ output: 'Room Created Successfully'})
        });

    app.post("/createBooking", function (req, res) {
            let booking = {};
            booking.id = uniqid();
            if(req.body.custName){booking.custName = req.body.custName} else{res.status(400).json({ output: 'Please specify customer Name for booking.'})};
            if(req.body.date){
                if (dateData.test(req.body.date)) {
                    booking.date = req.body.date
                } else{
                    res.status(400).json({ output: 'Please specify date in MM/DD/YYYY'})
                }
            } else{
                res.status(400).json({ output: 'Please specify date for booking.'})
            }
        
            if(req.body.startTime){
                if (timeData.test(req.body.startTime)) {
                    booking.startTime = req.body.startTime
                } else{
                    res.status(400).json({ output: 'Please specify time in hh:min(24-hr format) where minutes should be 00 only'})
                }
            } else{
                res.status(400).json({ output: 'Please specify Starting time for booking.'})
            }
        
            if(req.body.endTime){
                if (timeData.test(req.body.endTime)) {
                    booking.endTime = req.body.endTime
                } else{
                    res.status(400).json({ output: 'Please specify time in hh:min(24-hr format) where minutes should be 00 only'})
                }
            } else{
                res.status(400).json({ output: 'Please specify Ending time for booking.'})
            }
        
            const availableRooms = rooms.filter(room => {
                if(room.bookings.length == 0){
                    return true;
                } else{
                    room.bookings.filter(book =>{
                        if((book.date == req.body.date) ){
                            if((parseInt((book.startTime).substring(0, 1)) > parseInt((req.body.startTime).substring(0, 1)) ) && 
                            (parseInt((book.startTime).substring(0, 1)) > parseInt((req.body.endTime).substring(0, 1)) ) ){ 
                                if((parseInt((book.startTime).substring(0, 1)) < parseInt((req.body.startTime).substring(0, 1)) ) && 
                                  (parseInt((book.startTime).substring(0, 1)) < parseInt((req.body.endTime).substring(0, 1)) ) ){ 
                                    return true;
                                }
                            }
                        }
                        else{
                            return true;
                        }
                    })
        
                }
            });
            if(availableRooms.length == 0){res.status(400).json({ output: 'No Available Rooms on Selected Date and Time'})}
           else{
            roomRec = availableRooms[0];
           let count =0;
           rooms.forEach(element => {
               if(element.roomNo == roomRec.roomNo){
                rooms[count].bookings.push({
                    custName: req.body.custName,
                    startTime: req.body.startTime,
                    endTime: req.body.endTime,
                    date: req.body.date
                })
               }
               count++;
           });
           let bookingRec = req.body;
           bookingRec.roomNo = roomRec.roomNo;
           bookingRec.cost = parseInt(roomRec.price) * (parseInt((bookingRec.endTime).substring(0, 1)) - parseInt((bookingRec.startTime).substring(0, 1)));
        
        
           bookings.push(bookingRec);
           res.status(200).json({ output: 'Room Booking Successfully'}) 
        }
        });


app.listen(port,()=>console.log("successfully Port is running",port));