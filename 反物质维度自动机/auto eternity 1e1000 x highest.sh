auto eternity 1e1000 x highest
auto infinity off

if ec11 completions<5{
if ec10 completions<5{
  studies purchase XFR
  start ec10
  wait pending completions>=5
}

studies purchase IIT
unlock dilation
start dilation
pause 0.2s
eternity respec

if ec1 completions<5{
  studies purchase AAIT
  start ec1
  wait pending completions>=5
}

if ec2 completions<5{
  studies purchase AAIT
  start ec2
  wait pending completions>=5
}

if ec3 completions<5{
  studies purchase AAIT
  start ec3
  wait pending completions>=5
}

if ec4 completions<5{
  studies purchase IAIT
  start ec4
  wait pending completions>=5
}

if ec5 completions<5{
  studies purchase AAIT
  start ec5
  wait pending completions>=5
}

if ec6 completions<5{
  studies purchase AAIT
  start ec6
  wait pending completions>=5
}

if ec7 completions<5{
  studies purchase AAIT
  start ec7
  wait pending completions>=5
}

if ec8 completions<5{
  studies purchase IAIT
  start ec8
  wait pending completions>=5 
}

if ec9 completions<5{
  studies purchase AAIT
  start ec9
  wait pending completions>=5
}

if ec12 completions<5{
  studies purchase AAIT
  start ec12
  wait pending completions>=5
}

if ec11 completions<5{
  studies purchase IAIT
  start ec11
  wait pending completions>=5
}
}

studies purchase IAIT
wait ep >= 1e20000
auto eternity 1e100 x highest

start dilation
pause 0.5s
eternity

wait reality