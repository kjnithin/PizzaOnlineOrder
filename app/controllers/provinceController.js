var Province=require("../models/province");

var getProvince = function(req,res) {


      Province.find(function(err, province) {
        if(err)
          res.send(err);

        res.json(province);
      });
    };

var postProvince = function(req,res) {
              var province = new Province();
              province.name = req.body.name;
              province.tax=req.body.tax;

              province.save(function(err,status) {
                if(err){
                  res.status(400).json({
                    success:false,
                    message: 'Invalid request',
                    error: err
                  });
                }
                else{
                  res.status(200).json({
                    success:true,
                    message:'Province created'
                  });
                }
              });
            };

var getidProvince = function(req,res) {
              Province.findById(req.params.province_id, function(err, province) {
                     if(err)
                       res.send(err);

                     res.json(province);
                   });
            };

var putProvince = function(req,res) {
              Province.findById(req.params.province_id, function(err, province) {
                      if(err)
                        res.send(err);
                        province.name = req.body.name;
                        province.tax=req.body.tax;
                        province.save(function(err) {
                        if(err){
                          res.status(400).json({
                            success:false,
                            message: 'Invalid request',
                            error: errors
                          });
                        }
                        else{
                          res.status(200).json({
                            success:true,
                            message:'Province updated'
                          });
                        }
                      });
                    });
            };


var deleteProvince = function(req,res) {
              Province.remove({
                     _id: req.params.province_id
                   }, function(err, province) {
                     if(err)
                       res.send(err);

                     res.json({message: 'Province Deleted'});
                   });
            };


module.exports = {
  deleteProvince : deleteProvince,
  putProvince : putProvince,
  getidProvince : getidProvince,
  getProvince : getProvince,
  postProvince : postProvince
}