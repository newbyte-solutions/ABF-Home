
# Python Environment Setup

## Prerequisites
- Python 3.x installed on your system
- pip (Python package installer)

## Steps to Create a Simple Python Environment

1. Create a project directory:
   
   mkdir my_project
   cd my_project
   

2. Create a virtual environment:
   
   python -m venv venv
   

3. Activate the virtual environment:
   - On Windows:
     
     venv\Scripts\activate
     
   - On macOS and Linux:
     
     source venv/bin/activate
     

4. Install required packages:
   
   pip install -r requirements.txt
   
   (Create a `requirements.txt` file with your project dependencies)

5. Create a main Python file:
   
   touch main.py
   

6. Start coding in `main.py`!

7. To deactivate the virtual environment when finished:
   
   deactivate
   

## Best Practices
- Always use virtual environments for project isolation
- Keep your `requirements.txt` file up to date
- Use version control (e.g., Git) for your project

Happy coding!
