# SuperMind Hackathon Project

This project integrates **LangFlow** and **DataStax Astra DB** to process social media engagement data and generate actionable insights using **OpenAI GPT**. The application fetches social media engagement data from **DataStax Astra DB**, processes it, and leverages LangFlow to create dynamic prompts for GPT, which generates concise insights based on the data.

## Features:
- Integration with **DataStax Astra DB** to retrieve and store social media engagement data.
- Utilizes **LangFlow** for building dynamic workflows and generating GPT-powered insights.
- Frontend chat interface powered by **Flask**, **HTML**, **CSS**, and **JavaScript**.
- **OpenAI GPT** used for generating insights on engagement trends.
- Responsive and interactive chat experience.

## Table of Contents:
- [LangFlow Workflow](#langflow-workflow)
- [How DataStax Astra DB Was Used](#how-datastax-astra-db-was-used)
- [How GPT Was Leveraged](#how-gpt-was-leveraged)
- [Data Generation](#data-generation)
- [Installation Instructions](#installation-instructions)
- [Running the Project Locally](#running-the-project-locally)
- [Deploying on Render](#deploying-on-render)
- [Usage](#usage)

## LangFlow Workflow

The **LangFlow** workflow integrates multiple components to process social media data and produce meaningful insights:

1. **API Request**: Fetches social media engagement data from a REST API hosted on **DataStax Astra DB**.
2. **Parse Data**: Processes the raw data into a structured format.
3. **Prompt Engineering**: Creates a dynamic GPT prompt based on the parsed data.
4. **GPT Integration**: Utilizes **OpenAI GPT** to analyze engagement trends and generate concise insights.
5. **Output**: Displays the generated insights in a readable format.

## How DataStax Astra DB Was Used

**DataStax Astra DB** serves as the backbone for data storage and retrieval. The key features used in this project include:

- **Data Storage**: Social media engagement data is stored in a Cassandra database on **DataStax Astra DB**. This database is highly scalable and ideal for managing large volumes of data.
  
- **Querying**: A REST API endpoint is used to query engagement data. The data is processed and analyzed to generate insights into social media trends.
  
- **Authentication**: Secure access to the database is ensured using an **Astra DB API token**, which is stored in a `.env` file for safety.

The integration of **Astra DB** enables the handling of large datasets, ensuring seamless access to engagement data in real time, which is essential for generating insights dynamically.

## How GPT Was Leveraged

The workflow integrates **OpenAI GPT** to analyze social media trends and generate actionable insights. Here's how GPT is utilized:

- **Prompt-Based Insights**: The workflow generates dynamic prompts using the parsed data to ensure that the context is relevant for the analysis. This enables GPT to generate highly tailored responses based on current engagement data.
  
- **Summarization**: GPT provides concise insights into social media trends, highlighting key metrics such as engagement percentages and growth trends.
  
- **Context-Specific Responses**: **LangFlow** and GPT work together to handle out-of-context queries gracefully, providing predefined fallback messages that guide the user.

This integration showcases how **LangFlow** and **Astra DB** can be combined to create a powerful, dynamic AI-driven solution for data analysis.

## Data Generation

The social media engagement data used in this project was generated using a custom **Python script**. This script simulates social media engagement data and outputs it into a **CSV file**, which is then used for analysis and insights generation.

The generated data is stored in a **CSV file** called `social_media_engagement_data.csv`. This file contains the engagement data used by the project.You can find the `social_media_engagement_data.csv` file in the repository at the root level.

## Installation Instructions

### Prerequisites:
1. Python
2. Git (to clone the repository)
3. Virtual Environment (recommended)

### Steps to Set Up Locally:

1. Clone the repository:
    ```bash
    git clone https://github.com/tanmay2205/supermind-hackathon.git
    cd supermind-hackathon
    ```

2. Create a virtual environment:
    ```bash
    python -m venv venv
    ```

3. Activate the virtual environment:
    - On Windows:
        ```bash
        venv\Scripts\activate
        ```
    - On macOS/Linux:
        ```bash
        source venv/bin/activate
        ```

4. Install the required dependencies:
    ```bash
    pip install -r requirements.txt
    ```

5. Create a `.env` file in the root directory and add your sensitive data (LangFlow API credentials, Astra DB Key, etc.):

    ```text
    LANGFLOW_URL="https://api.langflow.astra.datastax.com"
    LANGFLOW_ID="your-langflow-id"
    ENDPOINT="your-endpoint-id"
    ASTRA_DB_KEY="your-astra-db-key"
    ```

6. Run the Flask application:
    ```bash
    python app.py
    ```

7. Open your browser and visit `http://127.0.0.1:5000` to interact with the chat application.

---

## Running the Project on Render

To deploy this project on **Render**:

1. Connect your GitHub repository to **Render**.
2. Set the build and start commands in Render:
    - **Build Command**: `pip install -r requirements.txt`
    - **Start Command**: `gunicorn app:app`
3. Render will automatically install dependencies, build the app, and deploy it.

---

## Live Deployment

We have deployed the project on **Render**. You can view and interact with it directly at the following link:

[SuperMind Hackathon - Live Demo](https://supermind-hackathon-znzs.onrender.com/)

---

## Usage

- Visit the deployed app via Render (or locally at `http://127.0.0.1:5000`).
- Enter a message in the input box and click the "Send" button.
- The bot will respond based on the message using **LangFlow** and **OpenAI GPT** to provide insights into social media engagement trends.

---
