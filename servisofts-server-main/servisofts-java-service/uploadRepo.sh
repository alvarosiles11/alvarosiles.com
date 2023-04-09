#!/bin/bash

# curl --request POST "https://repo.servisofts.com/up/home/servisofts/libs/java" \
#     -F '/servisofts-java-service.jar=@"./servisofts-java-service.jar"'

scp ./servisofts-java-service.jar servisofts@192.168.0.10:/home/servisofts/repo/resources/home/servisofts/libs/java/servisofts-java-service.jar