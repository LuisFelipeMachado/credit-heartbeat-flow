import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  ChevronDown,
  ChevronUp,
  Trash2,
  Plus,
  Calendar,
  Percent,
  Building2,
  User,
  Clock,
  AlertTriangle,
} from 'lucide-react';
import type { CreditTable, PrazoFaixa } from '@/types/creditTable';

interface CreditTableCardProps {
  table: CreditTable;
  onUpdate: (table: CreditTable) => void;
  onDelete: (id: string) => void;
}

export function CreditTableCard({ table, onUpdate, onDelete }: CreditTableCardProps) {
  const [isOpen, setIsOpen] = useState(true);

  const handleFieldChange = (field: keyof CreditTable, value: any) => {
    onUpdate({ ...table, [field]: value });
  };

  const handleAddFaixa = () => {
    const newFaixa: PrazoFaixa = {
      id: crypto.randomUUID(),
      prazo_min: table.prazo_min,
      prazo_max: table.prazo_max,
      taxa: table.taxa,
    };
    onUpdate({ ...table, faixas_prazo: [...table.faixas_prazo, newFaixa] });
  };

  const handleUpdateFaixa = (faixaId: string, field: keyof PrazoFaixa, value: any) => {
    const updatedFaixas = table.faixas_prazo.map((f) =>
      f.id === faixaId ? { ...f, [field]: value } : f
    );
    onUpdate({ ...table, faixas_prazo: updatedFaixas });
  };

  const handleDeleteFaixa = (faixaId: string) => {
    onUpdate({ ...table, faixas_prazo: table.faixas_prazo.filter((f) => f.id !== faixaId) });
  };

  return (
    <Card className={!table.ativa ? 'opacity-60' : ''}>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  {isOpen ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </CollapsibleTrigger>
              <div>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Input
                    value={table.nome}
                    onChange={(e) => handleFieldChange('nome', e.target.value)}
                    className="h-8 w-40 font-semibold"
                  />
                  {table.ativa ? (
                    <Badge variant="default">
                      Ativa
                    </Badge>
                  ) : (
                    <Badge variant="secondary">Inativa</Badge>
                  )}
                </CardTitle>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <Label htmlFor={`ativa-${table.id}`} className="text-sm text-muted-foreground">
                  Ativa
                </Label>
                <Switch
                  id={`ativa-${table.id}`}
                  checked={table.ativa}
                  onCheckedChange={(checked) => handleFieldChange('ativa', checked)}
                />
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-destructive hover:text-destructive"
                onClick={() => onDelete(table.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CollapsibleContent>
          <CardContent className="space-y-6">
            {/* Idade do Cliente */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-medium">
                <User className="h-4 w-4 text-primary" />
                Idade do Cliente
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Idade Mínima</Label>
                  <div className="relative">
                    <Input
                      type="number"
                      value={table.idade_min}
                      onChange={(e) => handleFieldChange('idade_min', parseInt(e.target.value) || 0)}
                      className="pr-12"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                      anos
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Idade Máxima</Label>
                  <div className="relative">
                    <Input
                      type="number"
                      value={table.idade_max}
                      onChange={(e) => handleFieldChange('idade_max', parseInt(e.target.value) || 0)}
                      className="pr-12"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                      anos
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Prazo e Taxa Base */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Calendar className="h-4 w-4 text-primary" />
                Prazo e Taxa Base
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Prazo Mínimo</Label>
                  <div className="relative">
                    <Input
                      type="number"
                      value={table.prazo_min}
                      onChange={(e) => handleFieldChange('prazo_min', parseInt(e.target.value) || 0)}
                      className="pr-16"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                      meses
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Prazo Máximo</Label>
                  <div className="relative">
                    <Input
                      type="number"
                      value={table.prazo_max}
                      onChange={(e) => handleFieldChange('prazo_max', parseInt(e.target.value) || 0)}
                      className="pr-16"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                      meses
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Taxa (a.m.)</Label>
                  <div className="relative">
                    <Input
                      value={table.taxa}
                      onChange={(e) => handleFieldChange('taxa', e.target.value)}
                      className="pr-8"
                      placeholder="0,00"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                      %
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Faixas de Prazo Customizadas */}
            {table.faixas_prazo.length > 0 && (
              <>
                <Separator />
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <Percent className="h-4 w-4 text-primary" />
                      Faixas de Prazo com Taxas Diferenciadas
                    </div>
                  </div>
                  <div className="space-y-2">
                    {table.faixas_prazo.map((faixa, index) => (
                      <div
                        key={faixa.id}
                        className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg"
                      >
                        <span className="text-sm font-medium text-muted-foreground w-8">
                          #{index + 1}
                        </span>
                        <div className="flex-1 grid grid-cols-3 gap-2">
                          <div className="relative">
                            <Input
                              type="number"
                              value={faixa.prazo_min}
                              onChange={(e) =>
                                handleUpdateFaixa(faixa.id, 'prazo_min', parseInt(e.target.value) || 0)
                              }
                              className="h-9 pr-8"
                              placeholder="De"
                            />
                            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground text-xs">
                              m
                            </span>
                          </div>
                          <div className="relative">
                            <Input
                              type="number"
                              value={faixa.prazo_max}
                              onChange={(e) =>
                                handleUpdateFaixa(faixa.id, 'prazo_max', parseInt(e.target.value) || 0)
                              }
                              className="h-9 pr-8"
                              placeholder="Até"
                            />
                            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground text-xs">
                              m
                            </span>
                          </div>
                          <div className="relative">
                            <Input
                              value={faixa.taxa}
                              onChange={(e) => handleUpdateFaixa(faixa.id, 'taxa', e.target.value)}
                              className="h-9 pr-6"
                              placeholder="Taxa"
                            />
                            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground text-xs">
                              %
                            </span>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive"
                          onClick={() => handleDeleteFaixa(faixa.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            <Button variant="outline" size="sm" onClick={handleAddFaixa} className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Faixa de Prazo
            </Button>

            <Separator />

            {/* Requisitos */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Clock className="h-4 w-4 text-primary" />
                Requisitos Mínimos
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Tempo Mínimo de CLT</Label>
                  <div className="relative">
                    <Input
                      type="number"
                      value={table.tempo_clt_meses}
                      onChange={(e) =>
                        handleFieldChange('tempo_clt_meses', parseInt(e.target.value) || 0)
                      }
                      className="pr-16"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                      meses
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Tempo Mínimo da Empresa</Label>
                  <div className="relative">
                    <Input
                      type="number"
                      value={table.tempo_empresa_anos}
                      onChange={(e) =>
                        handleFieldChange('tempo_empresa_anos', parseInt(e.target.value) || 0)
                      }
                      className="pr-12"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                      anos
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Restrições */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-medium">
                <AlertTriangle className="h-4 w-4 text-primary" />
                Restrições
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Negativa de FGTS obrigatória</span>
                </div>
                <Switch
                  checked={table.negativa_fgts}
                  onCheckedChange={(checked) => handleFieldChange('negativa_fgts', checked)}
                />
              </div>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}
