export const downloadWindows = (gpu, address, poolURL) => {
    const text = `:: Script Made By Albermonte
@echo off
mkdir NimiqMiner
cd NimiqMiner
powershell -Command "[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12;Invoke-WebRequest http://stahlworks.com/dev/unzip.exe -OutFile unzip.exe"
powershell -Command "[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12;Invoke-WebRequest https://github.com/tomkha/nq-miner/releases/download/0.99.6/nq-miner-windows-0.99.6.zip -OutFile nq-miner-windows.zip"
unzip.exe -o nq-miner-windows.zip -d nq-miner -x start_gpu.bat 
del /f /q nq-miner-windows.zip
del /f /q unzip.exe
echo|set /p= "cd nq-miner & cls & @echo off & echo "------------------------START Miner----------------------" & SET UV_THREADPOOL_SIZE=32 & nq-miner.exe -t ${gpu} -a "${address}" -n "NQ-Miner" -p ${poolURL} & echo "------------------------END Miner----------------------" & echo "Something went wrong or you exited" & pause" > start_gpu.bat
cls & echo. & echo. & echo. & echo. & echo. & echo. & echo. & echo ############################################################## & echo ######                                                  ###### & echo ######  Go to NimiqMiner folder and open start_gpu.bat  ###### & echo ######                                                  ###### & echo ############################################################## & echo. & echo. & echo. & echo. & echo. & echo. & echo Thanks & echo. & echo. & echo. & PAUSE
`
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', 'NIM_MinerSetup.bat');

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

export const downloadLinux = (gpu, address, poolURL) => {
    const text = `# Script Made By Albermonte
mkdir NimiqMiner
cd NimiqMiner
wget https://github.com/tomkha/nq-miner/releases/download/0.99.6/nq-miner-linux-0.99.6.tar.gz
mkdir nq-miner
tar -xzvf nq-miner-linux-0.99.6.tar.gz -C nq-miner
rm nq-miner-linux-0.99.6.tar.gz
rm ./nq-miner/start_gpu.sh
printf "clear \\n #!/bin/bash \\n echo \"------------------------START Miner----------------------\" \\n ./nq-miner/nq-miner -t ${gpu} -a \"${address}\" -n \"NQ-Miner\" -p ${poolURL} \\n echo \"------------------------END Miner----------------------\" \\n echo \"Something went wrong or you exited\"" > start_gpu.sh
clear && printf "\\n\\n\\n\\n ############################################################## \\n ######                                                  ###### \\n ######  Go to NimiqMiner folder and open start_gpu.sh   ###### \\n ######                                                  ###### \\n ############################################################## \\n\\n\\n\\n Thanks \\n\\n\\n"                                               ###### & echo ######  Go to NimiqMiner folder and open start_gpu.bat  ###### & echo ######                                                  ###### & echo ############################################################## & echo. & echo. & echo. & echo. & echo. & echo. & echo Thanks & echo. & echo. & echo. & PAUSE
`
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', 'NIM_MinerSetup.sh');

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}