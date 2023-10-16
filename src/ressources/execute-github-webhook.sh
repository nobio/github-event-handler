HOME=/home/pi/container
GHWH_HOME=$HOME/github-event-handler
DOCKER_COMPOSE_HOME=/usr/local/bin
DEPLOYMENTS=$(sudo find $GHWH_HOME -name "deploy.*")
DEBUGFILE=$HOME/github-webhook.log
#echo $DEPLOYMENTS

for deployment in $DEPLOYMENTS
do
  echo ================= start deployment for $deployment ================= >> $DEBUGFILE

  repo_dir=$(echo ${deployment} | awk -F. '{print $2}')

  #cmdPre=$(echo $(which docker-compose) -f ${HOME}/${repo_dir}/docker-compose.yaml )
  cmdPre=$(echo ${DOCKER_COMPOSE_HOME}/docker-compose -f ${HOME}/${repo_dir}/docker-compose.yaml )

  echo $cmdPre >> $DEBUGFILE

  echo '  > ' $cmdPre pull  >> $DEBUGFILE
  eval $cmdPre pull  >> $DEBUGFILE

  echo '  > ' $cmdPre down  >> $DEBUGFILE
  eval $cmdPre down  >> $DEBUGFILE

  echo '  > ' $cmdPre up -d  >> $DEBUGFILE
  eval $cmdPre up -d  >> $DEBUGFILE

  echo '  > ' docker system prune -a -f >> $DEBUGFILE
  eval docker system prune -a -f >> $DEBUGFILE
  echo '  > ' docker volume prune -f >> $DEBUGFILE
  eval docker volume prune -f >> $DEBUGFILE

  echo '  > ' rm $deployment >> $DEBUGFILE
  rm -f $deployment
done
