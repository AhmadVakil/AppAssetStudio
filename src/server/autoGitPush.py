import subprocess as cmd
import datetime
now = datetime.datetime.now()
cp = cmd.run("git add .", check=True, shell=True)
cp = cmd.run("git commit -m AutoGit-At:"+now.strftime("%Y-%m-%d-%H:%M:%S"), check=True, shell=True)
cp = cmd.run("git push", check=True, shell=True)
