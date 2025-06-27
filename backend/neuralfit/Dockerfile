# Use an official Python runtime as a parent image
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /code

# Set Hugging Face cache directory to a local, writable path to avoid permission errors
ENV HF_HOME /code/.cache

# Copy the dependencies file to the working directory
COPY requirements.txt .

# Create the cache directory and grant write permissions to all users
RUN mkdir -p /code/.cache && chmod -R 777 /code/.cache

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir --upgrade -r requirements.txt

# Copy the main application file
COPY app.py .

# Command to run the app on the port Hugging Face expects
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "7860"]
