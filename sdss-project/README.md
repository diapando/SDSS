# SOCIAL DISTANCING SUPERVISION SYSTEM (SDSS)

![ImgName](https://bitbucket.org/wesswess/sdss/raw/master/sdss-project/Images/Sys.png)

## Why Social Distancing Supervision System?

![ImgName](https://bitbucket.org/wesswess/sdss/raw/master/sdss-project/Images/virus.gif)

Coronavirus quick-spreading has forced nations to use all tricks in the book to contain it. A wide range of technologies has been used in their fight against the global pandemic, from applications that collect data to track the spread of the virus to 3D printed ventilators for hospitals.

As Ray Kurzweil said technology is the only thing that helped us overcome our problems, we use our tools to extend our range of possibilities, our minds, and our "mindwares", and as the philosophers, Andy Clark and David Chalmers talk about technology as a scaffolding that extends our thoughts, our reach, and our vision.

Driven by our passion for technology and with the increasing number of Coronavirus infections and the limited testing resources worldwide, flattening the curve is only achievable through collaborative efforts and social distancing became a necessity to survive.

Social distancing implies changing our day-to-day routine to reduce close contact with others. While general social distancing's rules are easy to maintain on sidewalks, it can be more stressful for business owners in job sites and grocery stores. Moreover, it complicates the government's responsibility to crowded active institutions and public places.

## Our SDSS solution


![ImgName](https://bitbucket.org/wesswess/sdss/raw/master/sdss-project/Images/do.gif)


On this matter, we are addressing the problem of unmonitored crowds by developing the SDSS as the abbreviation of the Social Distancing Supervision System. It is a real-time computer software vision based on image processing to spot crowd density. The system will take as input real-life videos from different crowded places to analyze, identify, and report the measured distance status between presented individuals in the given frame. 

To start, for the People detection, we are creating a Deep Learning algorithmic model using Python that analyzes the video frames.

Then, after the people detections are done, we are using a distance fomula to calculate distance between detected people in order to determin the social distancing violations number.

As a result, a real-time feed of the camera with all social distancing violations is provided to the supervisor. 

Add to that, in order to make further sense of the collected data, we introduced a Web Dashboard using Angular as a technology. Our dashboard takes a time based window to plot social distancing violations detected over a number of months, days, and hours on different cameras locations to show the peak amounts of activity over that window.
Thus, the data will be analyzed to help the user make better decisions and predict future trends.

## SDSS Features

This repository contains a script which is able to perform the tasks below:

- Person detection from live video, video/image file
- Counting the number of detected persons in a frame
- Precisely Measures the distance of detected persons using depth information (intrinsec camera parameters must be provided for correct estimations).
- For persons detection YOLO-V3 has been used. It is able to detect customized objects using OpenCV and Deep Learning trained model.
- An interractive Angular Web Dashboard has been introduced to display the different distance violation trends in charts by time and location. The main puropose of the Dashboard is to help the user make better social distancing decisions based on the displayed trends.

## Getting Started with the social distance detector 

### Required installations for social distance detector

In order to run the social distance detector script, Python version > 3.5 is required and the following libraries must be installed using commands below:

    $ pip install opencv-python
    $ pip install numpy
    $ pip install pandas
    $ pip install matplotlib
    $ pip install Pillow
    $ pip install imutils

For any missing requirements please use:

    $pip install <"insert the name of library">

The yolov3.weights and yolov3.cfg can be installed directly from the YOLO official website:
https://pjreddie.com/darknet/yolo/

Once downloaded yolov3.weights and yolov3.cfg should be placed under yolo-coco folder.

PS: Please use small size weights located in "tiny" folder for quick test of the code, however, it is not recommended for accurate detections.

## How to run the social distance detector script?

Please use the command below under social distancing detector folder:

    $python social_distance_detector.py --input SampleVideo.m4v --output outputVideoAfterDetection.avi

## How the Person detection works?

Let's start by explaining the Deep Learning concept.

### Why using Deep Learning for Person Detection?

Practically, Deep Learning is a subset of Machine Learning that achieves great power and flexibility by learning to represent the world as nested hierarchy of concepts, with each concept defined in relation to simpler concepts, and more abstract representations computed in terms of less abstract ones.
Elaborately, a deep learning technique learn categories incrementally through its hidden layer architecture, defining low-level categories like letters first then little higher level categories like words and then higher level categories like sentences.
In our example of image recognition it means identifying light/dark areas before categorizing lines and then shapes to allow Person recognition. Each neuron or node in the network represents one aspect of the whole and together they provide a full representation of the image. Each node or hidden layer is given a weight that represents the strength of its relationship with the output and as the model develops the weights are adjusted.

### Deep Learning detection Mechanism

![ImgName](https://bitbucket.org/wesswess/sdss/raw/master/sdss-project/Images/DeepLearning.png)

An input image is introduced to our Deep Learning algorithmic model. Our model takes care of the feature extraction from the provided image and then classifies features to Person Class. As a result, our system will have the ability to define whether a random provided image is a Person or Not Person element.

### SDSS detection mechanism

![ImgName](https://bitbucket.org/wesswess/sdss/raw/master/sdss-project/Images/neurone.gif)


### Distance Measurement

Traditionally we measure distance of any object using Ultrasonic sensors such as HC-sr04 or any other high frquency devices which generate sound waves to calculates the distance it traverse. However, when you are working with an embedded device to make a compact design which has functionalities such as Object detection (with camera) and Distance measurement, you don't always want to make your device heavier by adding unnnecessary hardware modules. To avoid such cases, you can follow a more convinent and feasible apporoach. As you have already integrated a camera for object detection, you can use the depth information that camera uses to draw the bounding boxes for localizing objects to calculate the distance of that object from the camera.

This formula is used for determining the distance:

    distancei = (2 x 3.14 x 180) ÷ (w + h x 360) x 1000 + 3

For measuring distance, at first we have to understand how a camera sees an object.

After getting 4 numbers in the bounding box which is (x0,y0,width,height). Here x0,y0 is used to tiled or adjust the bounding box. Width and Height these two variables are used in the formula of measuring the object and actually describing the detail of the detected object/objects. Width and Height will vary depending on the distance of the object from the camera.

As we know an image goes refracted when it goes through a lens because the ray of light can also enter the lens. Whereas, in the case of mirror, the light can be reflected that's why we get exact reflection of the image. But in the case of lens, the image gets little stretched.

![ImgName](https://bitbucket.org/wesswess/sdss/raw/master/sdss-project/Images/distance.png)

As you see in the below image, there are three variables named:
- do (Distance of object from the lens)
- di (Distance of the refracted image from the convex lens)
- f (focal length or focal distance)

So the green line "do" represents the actual distance of the object from the convex length. And "di" gives a sense of how the actual image looks like. Now if we consider a triangle in the left side of the image(new refracted image) with base "do" and draw a opposite triangle similar to the left side one. So, the new base of the opposite triangle will also be "do" with the same perpendicular distance. Now, if we compare the two triangles from right side, we will see "do" and "di" are parallel and the created angles on each side of both triangles are opposite to each other. From which we can infer that, both the triangles on the right side are also similar. Now, as they are similar, ratio of the corresponding sides will be also similar. So do/di = A/B.
Again if we compare between two triangles in right side of the image where opposite angles are equal and one angle of both the triangles are right angle (90°) (dark blue area). So A:B is both hypotenuse of the similar triangle where both triangle has a right angle.

### SDSS Distance Calculation

![ImgName](https://bitbucket.org/wesswess/sdss/raw/master/sdss-project/Images/file.gif)

## Let's Display our Dashboard

This Dashboard was generated with Angular CLI version 9.1.3.

### Dependencies Installation 

Before starting, make sure to be located in Dashboard folder then install the required dependencies:

    $ npm install 
    $ npm install --save mat-video
    $ ng add @angular/material

### Code scaffolding

To generate a new component, make sure to run:

    $ng generate component component-name 

### Build

To build the project, make sure to run:
    
    $ng build


### Running unit tests

To execute the unit tests via Karma, make sure to run:

    $ng test

### Running end-to-end tests

To execute the end-to-end tests via Protractor, make sure to run:

    $ng e2e

### Running the Development Server and Displaying the Dashboard

First, run this command to start the development server:

    $ng serve


Then, through your browser, navigate to http://localhost:4200/. 
Please notice that the app will automatically reload if you change any of the source files.
    
### The Dashboard Interface

![ImgName](https://bitbucket.org/wesswess/sdss/raw/master/sdss-project/Images/dash.gif)


## What makes our SDSS application cool?

- Preventing from Corona Virus contagion in a closed or open place.
	
- Using Deep Learning in the system makes it more similar to human being's intelligence , thus more developed and precised and autonomous in the Persons detections.

- The Display of data in the Dashboard, helps in the management decisions measures when it comes to social distancing by time and location.

## SDSS WoW factor

Our main SDSS WoW factor is the large perspective that this application has, it can be implemented in different places and in many situations.

It can be very helpful when it comes to thieves detection in stores or in the streets. Add to that, we can use it in making Marketing strategies for more stores revenues.

Thus, SDSS is an open application that can be used and extended to many domains with a creative and innovative way.


![ImgName](https://bitbucket.org/wesswess/sdss/raw/master/sdss-project/Images/thief.jpg)

## References

- https://sci-hub.tw/10.1109/SAS.2010.5439423
- https://www.khanacademy.org/science/physics/geometric-optics/lenses/v/object-image-and-focal-distance-relationship-proof-of-formula
- https://pjreddie.com/darknet/yolo/
- https://towardsdatascience.com/why-deep-learning-is-needed-over-traditional-machine-learning-1b6a99177063

## Authors

- Wassim Khorchef : wassim.khorchef@fisglobal.com
- Ameni Charradi : Ameni.charradi@fisglobal.com
- Marwan Farah : marwan.farah@fisglobal.com


## Acknowledgments

Many thanks to FIS colleagues and managers.
