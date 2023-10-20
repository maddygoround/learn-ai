#!/bin/bash
nohup caddy run --config /usr/src/app/caddy.json &
npm start