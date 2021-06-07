echo "Stopping..."
pm2 stop StasSocial --silent

echo "Installing..."
npm install
echo "Install success"

echo "Running..."
pm2 start app.js --name StasSocial
echo "All steps success"