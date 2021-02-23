<template>
  <div>
    <h2
      id="subtitle"
      class="mb-8 md:mb-12 font-medium text-center text-4xl md:text-5xl text-black"
    >
      Statistik Analyse
    </h2>

    <p class="md:text-lg text-justify text-black">
      Die interaktive Statistik ermöglicht es, verschiedene Einstellungen
      vorzunehmen, um z.B. zwischen verschiedenen Datentypen wie der Temperatur
      und Luftfeuchtigkeit per Schiebregler zu wechseln. Zusätzlich können die
      gewünschten Fallzahlen ein- und ausgeblendet werden, indem man sie über
      die Checkboxfunktion auswählt und über das Dropdownmenü kann für die
      Analyse das jeweilige Land ausgewählt werden. Eine Hover-Funktion
      ermöglicht es zudem, die genauen Datenwerte auf dem Graphen einzusehen.
      <br /><br />
      Bei dem ersten Betrachten der Temperaturdaten in der Statistik fiel sofort
      auf, dass bis auf zwei Länder (Estland und Venezuela) alle deutliche
      Ähnlichkeiten bei den Infektionszahlanstiegen aufweisen. So ist bei
      Deutschland, Mexiko, Schweden und Österreich um April herum eine erste
      Welle der Ausbreitung zu erkennen. Mexiko weist zwar auch diese erste
      Welle auf, sie ist jedoch deutlich länger und beginnt erst ab April und
      endet im November kurz vor der zweiten Welle. Diese findet bei den zuvor
      genannten Ländern bereits im Oktober ihren Anfang. Zudem ist bei diesen
      Nationen eine deutliche Absenkung nach der ersten Welle zu erkennen und
      der Unterschied in der Größe, dass heißt bei den wöchentlichen neuen
      Infektionszahlen, ist bei allen vier Ländern enorm. Wenn man in Betracht
      zieht, dass die Fallzahlen der ersten Welle mit den steigenden
      Temperaturen relativ schnell absinken und deutlich geringer sind als die
      Infektionszahlen ab ca. Oktober mit dem Anfang vom Herbst und dass die
      zweite Welle besonders lange anhielt, wird klar, dass eine negative
      Korrelation zwischen Temperatur und Infektionszahlen erkennbar wäre. Diese
      ist jedoch kritisch zu betrachten, da dieser Unterschied nicht bei der
      Analyse jedes Landes ersichtlich ist. <br /><br />
      Bei Venezuela ist dies beispielsweise der Fall. Hier beginnt die
      Infektionswelle ab Mitte Mai und hat im September ihren Hochpunkt
      erreicht, danach sinkt sie stetig bis zum Ende des Jahres, während die
      Temperatur das gesamte Jahr über sehr ähnlich bleibt. Eine kleine
      Auffälligkeit hierbei ist jedoch das Verhalten der Fallzahlen in der
      Hinsicht auf die Luftfeuchtigkeit, da die erste Welle ungefähr zur selben
      Zeit mit dem Anstieg der Luftfeuchtigkeit eintritt und mit dem Sinken
      dieser scheinen auch die Neuinfektionen zurückzugehen. Ob hierbei eine
      Korrelation besteht, ist jedoch schwer zu determinieren, da dies ein
      Einzelfall zu sein scheint und mehr Daten für eine genauere Analyse
      erforderlich wären.<br /><br />
      An Mexiko ist vor allem interessant, dass die erste Coronawelle mit dem
      Sinken der Temperatur beginnt, da diese ab ungefähr Mai abfällt und zum
      Tiefpunkt gibt es die meisten Neuinfektion während der Welle. Um die
      Wintermonate (November, Dezember) herum beginnt dann die zweite
      Infektionswelle, welche nochmal deutlich größer ist als die erste.<br /><br />
      Schließlich ist in Schweden der erste deutliche Anstieg der Fallzahlen mit
      dem Anstieg der Temperatur wie erwähnt um April herum zu erkennen. Diese
      erste Welle ist flacher als beispielsweise in Deutschland, Estland oder
      Schweden, hält jedoch etwas länger an. Mit dem Höchststand der Temperatur
      um Juli herum fällt diese jedoch stark ab und findet hier ihr Ende. Ab
      Oktober steigen mit dem Fall des Wärmegrads die Infektionen allerdings
      wieder rasant an und hier beginnt somit die zweite Welle.<br /><br />
      Es ist also ersichtlich, dass es eine Korrelation zwischen Klima und
      Infektionsverhalten geben könnte, um dies jedoch festzustellen, müsste in
      Zukunft der Betrachtungszeitraum erweitert und mehr Länder analysiert
      werden, um mehr Daten zu sammeln und eine genauere Aussage zu treffen.
    </p>
  </div>
</template>
