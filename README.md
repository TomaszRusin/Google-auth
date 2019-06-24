### Google-auth

# Multi session handling

Miałem taki pomysł żeby złapać sobie userów razem z ich id do tablicy googleProfiles.
W momencie logowania nowej sesji szedłby check czy nie ma już użytkownika z takim id.
Jeżeli nie ma to zostaje dodany do tablicy a jak jest to leci po prostu display użytkownika o tym id.
No i jeszcze trzeba by z sesji złapać id naszego obecnego (dla sesji) użytkownika żeby po reloadzie dalej się on wyświetlał
