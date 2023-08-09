song = "";

leftWristX = 0;
leftWristY = 0;

rightWristY = 0;
rightWristX = 0;

scoreLeftWrist = 0;



function preload(){
    song = loadSound("music.mp3");
}

function setup(){
  canvas =   createCanvas(600,500);
  canvas.center();

  video = createCapture(VIDEO);
  video.hide();

  poseNet = ml5.poseNet(video,modelLoaded);
  poseNet.on('pose',gotPoses);
  
}


function modelLoaded(){
    console.log("Model is loaded");
}

function gotPoses(results){

    if( results.length > 0){
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("Socre Left Wrist = " + scoreLeftWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;

        console.log("Right Wrist X = " + rightWristX +  "Right Wrist Y = " + rightWristY);
        console.log("Left Wrist X = "+ leftWristX +  "Left Wrist Y = " + leftWristY);

    }
}

function draw(){
    image(video,0,0,600,500);

    fill("#FF000");
    stroke("#FF000");

    if(scoreLeftWrist > 0.2 ){
        circle(leftWristX,leftWristY,20);
        InNumberLeftWristY = Number(leftWristY);
        remove_decimals  = floor(InNumberLeftWristY);
        volume = remove_decimals/500;
        document.getElementById("volume").innerHTML = "Volume = " + volume ;
        song.setVolume(volume);
    }
}

function play(){
    song.play();
    song.rate(1);
    song.setVolume(1);
}

