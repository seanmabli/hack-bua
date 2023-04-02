from scipy.io.wavfile import write
import sounddevice as sd
import speech_recognition as sr
import pyttsx3
import time

r = sr.Recognizer()

def checkInput(keywords, text):
	for word in keywords:
		if word in text.split():
			return True
	return False

def checkpatient():
	keywords = ('help').split()
	t = time.time()
	# Exception handling to handle
	# exceptions at the runtime
	try:
		
		# use the microphone as source for input.
		with sr.Microphone() as source2:
			print("start of mic: " + str(time.time()-t))
			t = time.time()
			# wait for a second to let the recognizer
			# adjust the energy threshold based on
			# the surrounding noise level
			r.adjust_for_ambient_noise(source2, duration=1)
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
		print("unknown error occurred")