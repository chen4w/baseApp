


set CURRENT_DIR=%cd%

set app_name=RepChain.jar
set sys_tag=%1


set logger_name=logback


set config_base=conf/
set config_app=system.conf
set config_log=logback.xml

set logfile = %config_base%%config_log%



%JAVA_HOME%/bin/java -Xmx1024m -Xms256m -Dlogger_name.configurationFile="%config_base%config_log" -jar %app_name% %sys_tag% 
