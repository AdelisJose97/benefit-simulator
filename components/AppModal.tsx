import { Modal, ModalBody, ModalContent, ModalHeader } from '@heroui/react';
import { QRCode } from './QRCode';
import { useSimulatorStore } from '@/store';
import { actionModalConst } from '@/utils';
import { PaymentStatusData } from '@/types';

interface AppModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  actionModal: string;
  paymentStatus: PaymentStatusData | null;
}
export const AppModal = ({
  isOpen,
  onOpenChange,
  actionModal,
  paymentStatus,
}: AppModalProps) => {
  const { payment } = useSimulatorStore();
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1 items-center">
          {actionModal === actionModalConst.SHOWQR && payment
            ? ' Escanea el codigo para realizar tu pago!'
            : ' Estado del pago'}
        </ModalHeader>
        <ModalBody className="py-4">
          {actionModal === actionModalConst.SHOWQR && payment ? (
            <QRCode value={payment.address} />
          ) : (
            <div>
              <p>
                {(paymentStatus?.amountCaptured ?? 0) > 0
                  ? 'El pago ha sido recibido'
                  : 'El pago no ha sido recibido'}
              </p>
              <p>
                Monto recibido:{' '}
                {paymentStatus?.amountCaptured ?? 'No disponible'}
              </p>
              <p>Estado: {paymentStatus?.status ?? 'No disponible'}</p>
            </div>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
