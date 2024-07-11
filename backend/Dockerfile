# Use a Python base image
FROM python:3.10.14-slim

# upgrade pip
RUN pip install --upgrade pip

# Set environment variables
ENV PYTHONUNBUFFERED 1

# Set working directory
WORKDIR /backend

# Copy requirements.txt to the working directory
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire project code to the working directory
COPY . .

ENTRYPOINT ["sh", "./entrypoint.sh"]