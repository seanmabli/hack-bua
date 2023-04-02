from scipy.io.wavfile import write
import sounddevice as sd
import speech_recognition as sr
import pyttsx3
import time

'''fs = 44100  # Sample rate
seconds = 3  # Duration of recording

myrecording = sd.rec(int(seconds * fs), samplerate=fs, channels=2)
sd.wait()  # Wait until recording is finished
write('output1.wav', fs, myrecording)  # Save as WAV file

filename = "output1.wav"
r = sr.Recognizer()

with sr.AudioFile(filename) as source:
    # listen for the data (load audio to memory)
    audio_data = r.record(source)
    # recognize (convert from speech to text)
    text = r.recognize_google(audio_data)
    print(text)'''

# Python program to translate
# speech to text and text to speech


import speech_recognition as sr
import pyttsx3

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


'''
# Import the Speech-to-Text client library
from google.clou# d import speech

# Instantiates a#  client
client = speech.# SpeechClient()

# The name of th# e audio file to transcribe
gcs_uri = "gs://# auto-to-text-hackathon/audio-files/Untitled video - Made with Clipchamp.mp4"

def transcribe_s# peech():
  audio = speech# .RecognitionAudio(uri=gcs_uri)

  config = speec# h.RecognitionConfig(
    encoding=spe# ech.RecognitionConfig.AudioEncoding.LINEAR16,
    sample_rate_# hertz=44100,
    language_cod# e="en-US",
    model="phone# _call",
    enable_word_# confidence=True,
    use_enhanced# =True,
    enable_word_# time_offsets=True,
  )

  # Detec# ts spee# ch in the audio file
  operation = cl# ient.long_running_recognize(config=config, audio=audio)

  print("Waiting#  for operation to complete...")
  response = ope# ration.result(timeout=90)

  for result in # response.results:
    print("Trans# cript: {}".format(result.alternatives[0].transcript))

transcribe_speec# h()'''

print(checkpatient())