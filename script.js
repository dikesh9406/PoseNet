let capture;
let posenet;
let noseX, noseY;
let singlePose;
let reyeX, reyeY;
let leyeX, leyeY;
let skeleton;
let spects;
let r, l;
let r1, l1;
let r2, l2;
let m;
let x;
let y;
// let keypoints;

function setup()
{
    createCanvas(640, 480);
capture= createCapture(VIDEO);
capture.hide();
posenet=ml5.poseNet(capture, modelLoaded);
posenet.on('pose', recivePoses);
spects=loadImage("images/spects.png");
}
function recivePoses(poses)
{
    console.log(poses);
    if(poses.length>0)
    {
        
        singlePose=poses[0].pose;
        skeleton=poses[0].skeleton;
        r=singlePose.keypoints[1].position.x;
        l=singlePose.keypoints[2].position.x;
        r1=singlePose.keypoints[1].position.y;
        l1=singlePose.keypoints[2].position.y;
        r2=(r+l)/2;
        l2=(r1+l1)/2;
        m=(l1-r1)/(l-r);
        x=Math.atan(m);

       
        // keypoints=poses[0].pose;
        
    }
    console.log(noseX+" "+ noseY);
}
function radToDeg(rad) {
    return rad * (180.0 / Math.PI);
}
y=radToDeg(x);


function modelLoaded()
{
    console.log("hello");
    console.log(r2);
}

function draw()
{
    image(capture, 0, 0, 637, 480);
    // image(img, x, y, 800, 500)
    // background(200)
    fill(255, 0, 0);
   if(singlePose)
   {
    for(let i=0;i<singlePose.keypoints.length;i++){
        ellipse(singlePose.keypoints[i].position.x, singlePose.keypoints[i].position.y, 7)
    }
    stroke(255, 0, 0);
    strokeWeight(3)
    for(let j=0;j<skeleton.length;j++)
    {
        line(skeleton[j][0].position.x,skeleton[j][0].position.y, skeleton[j][1].position.x,skeleton[j][1].position.y,  )
    }
    

    image(spects, r2-(l-r)*1.4, l2-(l-r), (l-r)*3, (l-r)*2);
    
    
   }
   
     
}