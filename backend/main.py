from fastapi import FastAPI

app = FastAPI(title="Plast-Metall Pro AI Consultant")


@app.get("/api/health")
async def health():
    return {"status": "ok"}
