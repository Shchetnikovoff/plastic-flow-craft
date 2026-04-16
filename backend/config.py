from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    llm_base_url: str = "https://ohmylama.ru/v1"
    llm_api_key: str = ""
    llm_model: str = "gpt-5.4-mini"

    smtp_host: str = "smtp.mail.ru"
    smtp_port: int = 465
    smtp_user: str = ""
    smtp_password: str = ""
    smtp_to: str = "osobenkov@list.ru"

    db_path: str = "leads.db"

    model_config = {"env_file": "../.env", "extra": "ignore"}


settings = Settings()
