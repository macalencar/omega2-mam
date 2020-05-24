#!/bin/ash
cat /dev/urandom 2> /dev/null |LC_ALL=C tr -dc 'A-Z9' 2>/dev/null | head -c${1:-81}
echo ""
