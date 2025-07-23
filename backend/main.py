from sqlalchemy import Column, Integer, String, Float
from backend.database import Base  # Absolute import

class Transaction(Base):
    __tablename__ = "transactions"

    id = Column(Integer, primary_key=True, index=True)
    description = Column(String, index=True)
    amount = Column(Float)