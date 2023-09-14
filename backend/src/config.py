import os

class DevelopmentConfig:
    DEVELOPMENT = True
    DEBUG = True
    POSTGRES_DB_URI = os.getenv("DEVELOPMENT_DATABASE_URL")

class ProductionConfig:
    DEBUG = False
    POSTGRES_DB_URI = os.getenv("PRODUCTION_DATEBASE_URL")

config = {
    "development": DevelopmentConfig,
    "production": ProductionConfig
}