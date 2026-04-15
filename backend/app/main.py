from fastapi import FastAPI

app = FastAPI()

@app.get("/")
async def root():
    return [{'message': 'hello word!'}, {'message': 'hello word!'}]
