from scipy.io.wavfile import write
import sounddevice as sd
import speech_recognition as sr
import pyttsx3
import time

from firebase_admin import credentials, initialize_app, storage


cred = credentials.Certificate('patientmonitorinterface-firebase-adminsdk-fami0-7bbad24660.json')
initialize_app(cred, {'storageBucket': 'patientmonitorinterface.appspot.com'})


source_blob_name = "audio.webm"
destination_file_name = r"C:\Users\laptop\hack-bua\languageprocessing\test.webm"
bucket_name = "patientmonitorinterface.appspot.com"

bucket = storage.bucket()
blob = bucket.blob(source_blob_name)
blob.download_to_filename(destination_file_name)


# Python program to translate
# speech to text and text to speech

# Initialize the recognizer
r = sr.Recognizer()

# Function to convert text to
# speech

# Loop infinitely for user to
# speak

def checkInput(keywords, text):
	for word in keywords:
		if word in text.split():
			return True
	return False

def checkpatient(file):
	keywords = ('help choke ouch choking choked hurt hurting hurts pain painful').split()
	t = time.time()
	# Exception handling to handle
	# exceptions at the runtime
	try:
		
		# use the microphone as source for input.
		with sr.AudioFile(file) as source2:
			print("start of mic: " + str(time.time()-t))
			t = time.time()
			# wait for a second to let the recognizer
			# adjust the energy threshold based on
			# the surrounding noise level
			r.adjust_for_ambient_noise(source2, duration=0.5)
			print("after ambient noise: " + str(time.time()-t))
			t = time.time()
			#listens for the user's input
			audio2 = r.listen(source2)
			print("after listen " + str(time.time()-t))
			t = time.time()
			# Using google to recognize audio
			MyText = r.recognize_google(audio2)
			print("after recognize " + str(time.time()-t))
			t = time.time()
			MyText = MyText.lower()
			if checkInput(keywords, MyText):
				return True, MyText
			else:
				return False, MyText
			time.sleep(.5)
			# x = input('wass up')
	except sr.RequestError as e:
		print("Could not request results; {0}".format(e))
		
	except sr.UnknownValueError:
		return False, ''