HOME=/home/pi/container
GHWH_HOME=$HOME/github-event-handler
DOCKER_COMPOSE_HOME=/usr/local/bin
DEPLOYMENTS=$(sudo find $GHWH_HOME -name "deploy.*")
DEBUGFILE=$HOME/github-webhook.log
#echo $DEPLOYMENTS

for deployment in $DEPLOYMENTS
do
  repo=$(echo ${deployment} | awk -Fdeploy. '{print $2}')
  echo -e "\r" >> $DEBUGFILE
  echo $(date +%F_%X) ================= start deployment for $repo ================= >> $DEBUGFILE

  #cmdPre=$(echo $(which docker-compose) -f ${HOME}/${repo}/docker-compose.yaml )
  cmdPre=$(echo ${DOCKER_COMPOSE_HOME}/docker-compose -f ${HOME}/${repo}/docker-compose.yaml )

  echo $(date +%F_%X) $cmdPre >> $DEBUGFILE

  echo $(date +%F_%X) '  > ' $cmdPre pull  >> $DEBUGFILE
  eval $cmdPre pull  >> $DEBUGFILE

  echo $(date +%F_%X ) '  > ' $cmdPre down  >> $DEBUGFILE
  eval $cmdPre down  >> $DEBUGFILE

  echo $(date +%F_%X) '  > ' $cmdPre up -d  >> $DEBUGFILE
  eval $cmdPre up -d  >> $DEBUGFILE

  echo $(date +%F_%X) '  > ' docker system prune -a -f >> $DEBUGFILE
  eval docker system prune -a -f >> $DEBUGFILE
  echo $(date +%F_%X) '  > ' docker volume prune -f >> $DEBUGFILE
  eval docker volume prune -f >> $DEBUGFILE

  echo $(date +%F_%X) '  > ' rm $deployment >> $DEBUGFILE
  rm -f $deployment
  echo $(date +%F_%X) ================= end of deployment for $repo ================= >> $DEBUGFILE
done
